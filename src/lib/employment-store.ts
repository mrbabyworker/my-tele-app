const EMPLOYMENT_KEY = "employment:percent";
const DEFAULT_EMPLOYMENT_PERCENT = 0;
const SUPABASE_SETTINGS_TABLE = "app_settings";

let localEmploymentPercent = DEFAULT_EMPLOYMENT_PERCENT;

type RedisResponse<T> =
  | {
      result: T;
      error?: never;
    }
  | {
      result?: never;
      error: string;
    };

export function clampEmploymentPercent(percent: number) {
  return Math.min(100, Math.max(0, Math.round(percent)));
}

export async function getEmploymentPercent() {
  const supabaseConfig = getSupabaseConfig();

  if (supabaseConfig) {
    const value = await getSupabaseEmploymentPercent(supabaseConfig);

    return value ?? DEFAULT_EMPLOYMENT_PERCENT;
  }

  const redisConfig = getRedisConfig();

  if (!redisConfig) {
    return localEmploymentPercent;
  }

  const value = await redisCommand<string | number | null>(["GET", EMPLOYMENT_KEY]);

  if (value === null || value === undefined) {
    return DEFAULT_EMPLOYMENT_PERCENT;
  }

  return clampEmploymentPercent(Number(value));
}

export async function setEmploymentPercent(percent: number) {
  const nextPercent = clampEmploymentPercent(percent);
  const supabaseConfig = getSupabaseConfig();

  if (supabaseConfig) {
    await setSupabaseEmploymentPercent(supabaseConfig, nextPercent);
    return nextPercent;
  }

  const redisConfig = getRedisConfig();

  if (!redisConfig) {
    localEmploymentPercent = nextPercent;
    return nextPercent;
  }

  await redisCommand(["SET", EMPLOYMENT_KEY, String(nextPercent)]);
  return nextPercent;
}

export function hasPersistentEmploymentStore() {
  return getSupabaseConfig() !== null || getRedisConfig() !== null;
}

async function redisCommand<T>(command: unknown[]) {
  const redisConfig = getRedisConfig();

  if (!redisConfig) {
    throw new Error("Persistent employment store is not configured");
  }

  const response = await fetch(redisConfig.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisConfig.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis request failed with status ${response.status}`);
  }

  const data = (await response.json()) as RedisResponse<T>;

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}

function getRedisConfig() {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

  if (!url || !token) {
    return null;
  }

  return { token, url };
}

type SupabaseConfig = {
  serviceRoleKey: string;
  url: string;
};

type SupabaseSettingRow = {
  key: string;
  value: number | string | null;
};

async function getSupabaseEmploymentPercent(config: SupabaseConfig) {
  const response = await fetch(
    `${config.url}/rest/v1/${SUPABASE_SETTINGS_TABLE}?key=eq.${encodeURIComponent(EMPLOYMENT_KEY)}&select=key,value&limit=1`,
    {
      headers: getSupabaseHeaders(config),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Supabase GET request failed with status ${response.status}: ${await response.text()}`,
    );
  }

  const rows = (await response.json()) as SupabaseSettingRow[];
  const value = rows[0]?.value;

  if (value === null || value === undefined) {
    return null;
  }

  return clampEmploymentPercent(Number(value));
}

async function setSupabaseEmploymentPercent(
  config: SupabaseConfig,
  percent: number,
) {
  const response = await fetch(
    `${config.url}/rest/v1/${SUPABASE_SETTINGS_TABLE}?on_conflict=key`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(config),
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        key: EMPLOYMENT_KEY,
        updated_at: new Date().toISOString(),
        value: percent,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Supabase SET request failed with status ${response.status}: ${await response.text()}`,
    );
  }
}

function getSupabaseHeaders(config: SupabaseConfig) {
  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    serviceRoleKey,
    url: url.replace(/\/$/, ""),
  };
}
