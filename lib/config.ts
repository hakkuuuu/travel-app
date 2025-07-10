// Configuration utility for environment-specific settings

export interface AppConfig {
  isDebug: boolean;
  allowedHosts: string[];
  port: number;
  hostname: string;
  environment: string;
}

export function getAppConfig(): AppConfig {
  const isDebug = process.env.DEBUG === 'true';
  const environment = process.env.NODE_ENV || 'development';
  
  // Determine allowed hosts based on environment
  const allowedHosts = isDebug 
    ? ['localhost', '127.0.0.1', '0.0.0.0']
    : [
        process.env.RAILWAY_STATIC_URL || 'localhost',
        process.env.RAILWAY_PUBLIC_DOMAIN || 'localhost',
        'localhost',
        '0.0.0.0'
      ];

  return {
    isDebug,
    allowedHosts,
    port: parseInt(process.env.PORT || '3000', 10),
    hostname: process.env.HOSTNAME || '0.0.0.0',
    environment
  };
}

// Validate if a host is allowed
export function isAllowedHost(host: string): boolean {
  const config = getAppConfig();
  return config.allowedHosts.includes(host) || 
         config.allowedHosts.includes('0.0.0.0') ||
         config.isDebug;
}

// Get environment-specific configuration
export function getEnvironmentConfig() {
  const config = getAppConfig();
  
  return {
    // Server configuration
    server: {
      port: config.port,
      hostname: config.hostname,
      allowedHosts: config.allowedHosts,
    },
    
    // Application configuration
    app: {
      isDebug: config.isDebug,
      environment: config.environment,
      name: 'Travelis',
      version: '2.0.0',
    },
    
    // Database configuration (if needed)
    database: {
      url: process.env.MONGODB_URI || process.env.DATABASE_URL,
    },
    
    // API configuration
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 10000,
    }
  };
} 