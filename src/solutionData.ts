export interface SolutionFile {
  id: string;
  path: string;
  name: string;
  content: string;
  category: 'api' | 'platform' | 'infrastructure' | 'module' | 'shared' | 'database' | 'solution' | 'docs';
}

export const solutionFiles: SolutionFile[] = [
  // --- SOLUTION LEVEL ---
  {
    id: "vms-sln",
    path: "VMS.sln",
    name: "VMS.sln",
    category: "solution",
    content: `Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.10.35019.166
MinimumVisualStudioVersion = 10.0.40219.1
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "VMS.Api", "src\\VMS.Api\\VMS.Api.csproj", "{A1111111-1111-1111-1111-111111111111}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "VMS.Platform.Abstractions", "src\\VMS.Platform.Abstractions\\VMS.Platform.Abstractions.csproj", "{B2222222-2222-2222-2222-222222222222}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "VMS.Platform", "src\\VMS.Platform\\VMS.Platform.csproj", "{C3333333-3333-3333-3333-333333333333}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "VMS.Infrastructure", "src\\VMS.Infrastructure\\VMS.Infrastructure.csproj", "{D4444444-4444-4444-4444-444444444444}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "VMS.Shared", "src\\VMS.Shared\\VMS.Shared.csproj", "{E5555555-5555-5555-5555-555555555555}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "Asset", "src\\Modules\\Asset\\Asset.csproj", "{F6666666-6666-6666-6666-666666666666}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Any CPU = Debug|Any CPU
		Release|Any CPU = Release|Any CPU
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{A1111111-1111-1111-1111-111111111111}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{A1111111-1111-1111-1111-111111111111}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{A1111111-1111-1111-1111-111111111111}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{A1111111-1111-1111-1111-111111111111}.Release|Any CPU.Build.0 = Release|Any CPU
		{B2222222-2222-2222-2222-222222222222}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{B2222222-2222-2222-2222-222222222222}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{B2222222-2222-2222-2222-222222222222}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{B2222222-2222-2222-2222-222222222222}.Release|Any CPU.Build.0 = Release|Any CPU
		{C3333333-3333-3333-3333-333333333333}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{C3333333-3333-3333-3333-333333333333}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{C3333333-3333-3333-3333-333333333333}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{C3333333-3333-3333-3333-333333333333}.Release|Any CPU.Build.0 = Release|Any CPU
		{D4444444-4444-4444-4444-444444444444}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{D4444444-4444-4444-4444-444444444444}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{D4444444-4444-4444-4444-444444444444}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{D4444444-4444-4444-4444-444444444444}.Release|Any CPU.Build.0 = Release|Any CPU
		{E5555555-5555-5555-5555-555555555555}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{E5555555-5555-5555-5555-555555555555}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{E5555555-5555-5555-5555-555555555555}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{E5555555-5555-5555-5555-555555555555}.Release|Any CPU.Build.0 = Release|Any CPU
		{F6666666-6666-6666-6666-666666666666}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{F6666666-6666-6666-6666-666666666666}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{F6666666-6666-6666-6666-666666666666}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{F6666666-6666-6666-6666-666666666666}.Release|Any CPU.Build.0 = Release|Any CPU
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
EndGlobal
`
  },

  // --- VMS.SHARED ---
  {
    id: "shared-csproj",
    path: "src/VMS.Shared/VMS.Shared.csproj",
    name: "VMS.Shared.csproj",
    category: "shared",
    content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="FluentValidation" Version="11.11.0" />
    <PackageReference Include="Microsoft.AspNetCore.Http.Abstractions" Version="2.2.0" />
  </ItemGroup>
</Project>`
  },
  {
    id: "shared-result",
    path: "src/VMS.Shared/Models/Result.cs",
    name: "Result.cs",
    category: "shared",
    content: `namespace VMS.Shared.Models;

public class Result<T>
{
    public bool Succeeded { get; }
    public T? Value { get; }
    public string? ErrorCode { get; }
    public string? ErrorMessage { get; }

    protected Result(bool succeeded, T? value, string? errorCode, string? errorMessage)
    {
        Succeeded = succeeded;
        Value = value;
        ErrorCode = errorCode;
        ErrorMessage = errorMessage;
    }

    public static Result<T> Success(T value) => new(true, value, null, null);
    public static Result<T> Failure(string errorCode, string errorMessage) => new(false, default, errorCode, errorMessage);
}

public class Result
{
    public bool Succeeded { get; }
    public string? ErrorCode { get; }
    public string? ErrorMessage { get; }

    protected Result(bool succeeded, string? errorCode, string? errorMessage)
    {
        Succeeded = succeeded;
        ErrorCode = errorCode;
        ErrorMessage = errorMessage;
    }

    public static Result Success() => new(true, null, null);
    public static Result Failure(string errorCode, string errorMessage) => new(false, errorCode, errorMessage);
}`
  },
  {
    id: "shared-api-response",
    path: "src/VMS.Shared/Models/ApiResponse.cs",
    name: "ApiResponse.cs",
    category: "shared",
    content: `namespace VMS.Shared.Models;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? ErrorCode { get; set; }
    public string? ErrorMessage { get; set; }
    public string CorrelationId { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static ApiResponse<T> CreateSuccess(T data, string correlationId = "") => new()
    {
        Success = true,
        Data = data,
        CorrelationId = correlationId
    };

    public static ApiResponse<T> CreateFailure(string errorCode, string errorMessage, string correlationId = "") => new()
    {
        Success = false,
        ErrorCode = errorCode,
        ErrorMessage = errorMessage,
        CorrelationId = correlationId
    };
}`
  },
  {
    id: "shared-paged-response",
    path: "src/VMS.Shared/Models/PagedResponse.cs",
    name: "PagedResponse.cs",
    category: "shared",
    content: `namespace VMS.Shared.Models;

public class PagedResponse<T> : ApiResponse<IEnumerable<T>>
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasPreviousPage => PageIndex > 1;
    public bool HasNextPage => PageIndex < TotalPages;

    public static PagedResponse<T> CreatePaged(IEnumerable<T> data, int totalCount, int pageIndex, int pageSize, string correlationId = "") => new()
    {
        Success = true,
        Data = data,
        TotalCount = totalCount,
        PageIndex = pageIndex,
        PageSize = pageSize,
        CorrelationId = correlationId
    };
}`
  },
  {
    id: "shared-base-validator",
    path: "src/VMS.Shared/Models/BaseValidator.cs",
    name: "BaseValidator.cs",
    category: "shared",
    content: `using FluentValidation;

namespace VMS.Shared.Models;

public abstract class BaseValidator<T> : AbstractValidator<T>
{
    // Common validation rules for Enterprise system
    protected BaseValidator()
    {
        // Global pre-validations or customized hooks can go here
    }
}

public class PaginationFilter
{
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}`
  },
  {
    id: "shared-error-codes",
    path: "src/VMS.Shared/Constants/ErrorCodes.cs",
    name: "ErrorCodes.cs",
    category: "shared",
    content: `namespace VMS.Shared.Constants;

public static class ErrorCodes
{
    public const string ValidationError = "VAL_400";
    public const string Unauthorized = "AUTH_401";
    public const string Forbidden = "AUTH_403";
    public const string NotFound = "ERR_404";
    public const string InternalServerError = "ERR_500";

    public static class Asset
    {
        public const string DuplicateHostName = "AST_001";
        public const string InvalidIPAddress = "AST_002";
        public const string AssetNotFound = "AST_003";
        public const string SaveFailed = "AST_004";
    }
}`
  },
  {
    id: "shared-constants",
    path: "src/VMS.Shared/Constants/Constants.cs",
    name: "Constants.cs",
    category: "shared",
    content: `namespace VMS.Shared.Constants;

public static class Constants
{
    public const string CorrelationIdHeader = "X-Correlation-Id";
    public const string DefaultTenantId = "00000000-0000-0000-0000-000000000000";

    public static class Roles
    {
        public const string GlobalAdmin = "GlobalAdmin";
        public const string SecurityAnalyst = "SecurityAnalyst";
        public const string AssetOwner = "AssetOwner";
        public const string Auditor = "Auditor";
    }
}`
  },

  // --- VMS.PLATFORM.ABSTRACTIONS ---
  {
    id: "abstractions-csproj",
    path: "src/VMS.Platform.Abstractions/VMS.Platform.Abstractions.csproj",
    name: "VMS.Platform.Abstractions.csproj",
    category: "platform",
    content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\\VMS.Shared\\VMS.Shared.csproj" />
  </ItemGroup>
</Project>`
  },
  {
    id: "abstractions-db-connection",
    path: "src/VMS.Platform.Abstractions/Database/IDbConnectionFactory.cs",
    name: "IDbConnectionFactory.cs",
    category: "platform",
    content: `using System.Data;

namespace VMS.Platform.Abstractions.Database;

public interface IDbConnectionFactory
{
    IDbConnection CreateConnection(string? connectionString = null);
}`
  },
  {
    id: "abstractions-db-router",
    path: "src/VMS.Platform.Abstractions/Database/IDatabaseRouter.cs",
    name: "IDatabaseRouter.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Database;

public interface IDatabaseRouter
{
    string GetConnectionString();
}`
  },
  {
    id: "abstractions-cache",
    path: "src/VMS.Platform.Abstractions/Cache/ICacheProvider.cs",
    name: "ICacheProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Cache;

public interface ICacheProvider
{
    Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default);
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null, CancellationToken cancellationToken = default);
    Task RemoveAsync(string key, CancellationToken cancellationToken = default);
}`
  },
  {
    id: "abstractions-auth",
    path: "src/VMS.Platform.Abstractions/Authentication/IAuthenticationProvider.cs",
    name: "IAuthenticationProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Authentication;

public interface IAuthenticationProvider
{
    Task<AuthResult> AuthenticateAsync(string username, string password, CancellationToken cancellationToken = default);
}

public record AuthResult(bool Succeeded, string? Token, string? ErrorMessage, string? DisplayName, string? Email, string[] Roles);`
  },
  {
    id: "abstractions-encryption",
    path: "src/VMS.Platform.Abstractions/Encryption/IEncryptionProvider.cs",
    name: "IEncryptionProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Encryption;

public interface IEncryptionProvider
{
    string Encrypt(string plainText);
    string Decrypt(string cipherText);
}`
  },
  {
    id: "abstractions-storage",
    path: "src/VMS.Platform.Abstractions/Storage/IStorageProvider.cs",
    name: "IStorageProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Storage;

public interface IStorageProvider
{
    Task SaveFileAsync(string path, Stream stream, CancellationToken cancellationToken = default);
    Task<Stream> GetFileAsync(string path, CancellationToken cancellationToken = default);
    Task DeleteFileAsync(string path, CancellationToken cancellationToken = default);
}`
  },
  {
    id: "abstractions-notification",
    path: "src/VMS.Platform.Abstractions/Notification/INotificationProvider.cs",
    name: "INotificationProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Notification;

public interface INotificationProvider
{
    Task SendEmailAsync(string to, string subject, string body, CancellationToken cancellationToken = default);
    Task SendSmsAsync(string number, string message, CancellationToken cancellationToken = default);
}`
  },
  {
    id: "abstractions-current-user",
    path: "src/VMS.Platform.Abstractions/CurrentUser/ICurrentUserProvider.cs",
    name: "ICurrentUserProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.CurrentUser;

public interface ICurrentUserProvider
{
    string? UserId { get; }
    string? Username { get; }
    string? TenantId { get; }
    string[] Roles { get; }
    bool IsInRole(string role);
}`
  },
  {
    id: "abstractions-audit",
    path: "src/VMS.Platform.Abstractions/Audit/IAuditProvider.cs",
    name: "IAuditProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.Audit;

public interface IAuditProvider
{
    Task LogAsync(AuditEntry entry, CancellationToken cancellationToken = default);
}

public record AuditEntry(string Action, string EntityType, string EntityId, string Details, string? UserId, DateTime Timestamp);`
  },
  {
    id: "abstractions-feature-flags",
    path: "src/VMS.Platform.Abstractions/FeatureFlags/IFeatureFlagsProvider.cs",
    name: "IFeatureFlagsProvider.cs",
    category: "platform",
    content: `namespace VMS.Platform.Abstractions.FeatureFlags;

public interface IFeatureFlagsProvider
{
    Task<bool> IsEnabledAsync(string featureName, CancellationToken cancellationToken = default);
}`
  },

  // --- VMS.PLATFORM ---
  {
    id: "platform-csproj",
    path: "src/VMS.Platform/VMS.Platform.csproj",
    name: "VMS.Platform.csproj",
    category: "platform",
    content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Http" Version="2.2.2" />
    <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.2" />
    <PackageReference Include="Microsoft.Extensions.Caching.Abstractions" Version="9.0.0" />
    <PackageReference Include="Microsoft.Extensions.Caching.Memory" Version="9.0.0" />
    <PackageReference Include="Microsoft.Extensions.Options" Version="9.0.0" />
    <PackageReference Include="StackExchange.Redis" Version="2.8.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\VMS.Platform.Abstractions\\VMS.Platform.Abstractions.csproj" />
  </ItemGroup>
</Project>`
  },
  {
    id: "platform-sql-factory",
    path: "src/VMS.Platform/Database/SqlConnectionFactory.cs",
    name: "SqlConnectionFactory.cs",
    category: "platform",
    content: `using System.Data;
using Microsoft.Data.SqlClient;
using VMS.Platform.Abstractions.Database;

namespace VMS.Platform.Database;

public class SqlConnectionFactory : IDbConnectionFactory
{
    private readonly IDatabaseRouter _dbRouter;

    public SqlConnectionFactory(IDatabaseRouter dbRouter)
    {
        _dbRouter = dbRouter;
    }

    public IDbConnection CreateConnection(string? connectionString = null)
    {
        var activeString = connectionString ?? _dbRouter.GetConnectionString();
        var connection = new SqlConnection(activeString);
        return connection;
    }
}`
  },
  {
    id: "platform-db-router",
    path: "src/VMS.Platform/Database/DatabaseRouter.cs",
    name: "DatabaseRouter.cs",
    category: "platform",
    content: `using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using VMS.Platform.Abstractions.Database;

namespace VMS.Platform.Database;

public class DatabaseOptions
{
    public const string SectionName = "Database";
    public string Provider { get; set; } = "SqlServer";
    public string WriteConnectionString { get; set; } = string.Empty;
    public string ReadConnectionString { get; set; } = string.Empty;
    public List<string> ReadMethods { get; set; } = new();
}

public class DatabaseRouter : IDatabaseRouter
{
    private readonly DatabaseOptions _options;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DatabaseRouter(IOptions<DatabaseOptions> options, IHttpContextAccessor httpContextAccessor)
    {
        _options = options.Value;
        _httpContextAccessor = httpContextAccessor;
    }

    public string GetConnectionString()
    {
        var context = _httpContextAccessor.HttpContext;
        if (context == null)
        {
            return _options.WriteConnectionString;
        }

        // 1. Check endpoint metadata for explicit routing directives
        var endpoint = context.GetEndpoint();
        if (endpoint != null)
        {
            var endpointName = endpoint.Metadata.GetMetadata<Microsoft.AspNetCore.Routing.EndpointNameMetadata>()?.EndpointName 
                ?? endpoint.DisplayName 
                ?? string.Empty;

            foreach (var readMethod in _options.ReadMethods)
            {
                if (endpointName.Contains(readMethod, StringComparison.OrdinalIgnoreCase))
                {
                    return _options.ReadConnectionString; // Safe routing to Read Replica
                }
            }
        }

        // 2. Safe Fallback: Route HTTP GET methods to ReadDb connection string
        if (HttpMethods.IsGet(context.Request.Method))
        {
            return _options.ReadConnectionString;
        }

        // 3. Default: Route writes (POST, PUT, DELETE, PATCH) to Primary Database
        return _options.WriteConnectionString;
    }
}`
  },
  {
    id: "platform-memory-cache",
    path: "src/VMS.Platform/Cache/MemoryCacheProvider.cs",
    name: "MemoryCacheProvider.cs",
    category: "platform",
    content: `using Microsoft.Extensions.Caching.Memory;
using VMS.Platform.Abstractions.Cache;

namespace VMS.Platform.Cache;

public class MemoryCacheProvider : ICacheProvider
{
    private readonly IMemoryCache _memoryCache;

    public MemoryCacheProvider(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
    {
        _memoryCache.TryGetValue(key, out T? value);
        return Task.FromResult(value);
    }

    public Task SetAsync<T>(string key, T value, TimeSpan? expiration = null, CancellationToken cancellationToken = default)
    {
        var options = new MemoryCacheEntryOptions();
        if (expiration.HasValue)
        {
            options.AbsoluteExpirationRelativeToNow = expiration.Value;
        }
        _memoryCache.Set(key, value, options);
        return Task.CompletedTask;
    }

    public Task RemoveAsync(string key, CancellationToken cancellationToken = default)
    {
        _memoryCache.Remove(key);
        return Task.CompletedTask;
    }
}`
  },
  {
    id: "platform-redis-cache",
    path: "src/VMS.Platform/Cache/RedisCacheProvider.cs",
    name: "RedisCacheProvider.cs",
    category: "platform",
    content: `using System.Text.Json;
using StackExchange.Redis;
using VMS.Platform.Abstractions.Cache;

namespace VMS.Platform.Cache;

public class CacheOptions
{
    public const string SectionName = "Cache";
    public string Provider { get; set; } = "Memory"; // Memory, Redis, Valkey
    public string ConnectionString { get; set; } = string.Empty;
}

public class RedisCacheProvider : ICacheProvider
{
    private readonly IDatabase _redisDb;

    public RedisCacheProvider(IConnectionMultiplexer connectionMultiplexer)
    {
        _redisDb = connectionMultiplexer.GetDatabase();
    }

    public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
    {
        var value = await _redisDb.StringGetAsync(key);
        if (value.IsNullOrEmpty) return default;
        return JsonSerializer.Deserialize<T>(value!);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null, CancellationToken cancellationToken = default)
    {
        var serialized = JsonSerializer.Serialize(value);
        await _redisDb.StringSetAsync(key, serialized, expiration);
    }

    public async Task RemoveAsync(string key, CancellationToken cancellationToken = default)
    {
        await _redisDb.KeyDeleteAsync(key);
    }
}`
  },
  {
    id: "platform-cache-factory",
    path: "src/VMS.Platform/Cache/CacheProviderFactory.cs",
    name: "CacheProviderFactory.cs",
    category: "platform",
    content: `using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using VMS.Platform.Abstractions.Cache;

namespace VMS.Platform.Cache;

public static class CacheProviderFactory
{
    public static IServiceCollection AddVmsCaching(this IServiceCollection services, CacheOptions options)
    {
        if (options.Provider.Equals("Redis", StringComparison.OrdinalIgnoreCase) || 
            options.Provider.Equals("Valkey", StringComparison.OrdinalIgnoreCase))
        {
            // Register Redis connection and active provider
            var multiplexer = StackExchange.Redis.ConnectionMultiplexer.Connect(options.ConnectionString);
            services.AddSingleton<StackExchange.Redis.IConnectionMultiplexer>(multiplexer);
            services.AddSingleton<ICacheProvider, RedisCacheProvider>();
        }
        else
        {
            // Default to ultra-fast client-side Memory Cache
            services.AddMemoryCache();
            services.AddSingleton<ICacheProvider, MemoryCacheProvider>();
        }
        return services;
    }
}`
  },
  {
    id: "platform-jwt-auth",
    path: "src/VMS.Platform/Authentication/JwtAuthenticationProvider.cs",
    name: "JwtAuthenticationProvider.cs",
    category: "platform",
    content: `using VMS.Platform.Abstractions.Authentication;

namespace VMS.Platform.Authentication;

public class AuthOptions
{
    public const string SectionName = "Authentication";
    public string Provider { get; set; } = "JWT"; // JWT, LDAP, SAML, AzureAD
    public JwtSettings Jwt { get; set; } = new();
    public LdapSettings Ldap { get; set; } = new();
}

public class JwtSettings
{
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpiryInMinutes { get; set; } = 60;
}

public class LdapSettings
{
    public string Server { get; set; } = string.Empty;
    public int Port { get; set; } = 389;
    public bool UseSsl { get; set; }
}

public class JwtAuthenticationProvider : IAuthenticationProvider
{
    public Task<AuthResult> AuthenticateAsync(string username, string password, CancellationToken cancellationToken = default)
    {
        // Core enterprise JWT validation and creation skeleton
        if (username == "admin" && password == "P@ssword123")
        {
            var result = new AuthResult(
                Succeeded: true,
                Token: "vms-jwt-access-token-simulation-active",
                ErrorMessage: null,
                DisplayName: "Administrator",
                Email: "admin@vms.local",
                Roles: new[] { "GlobalAdmin", "SecurityAnalyst" }
            );
            return Task.FromResult(result);
        }

        return Task.FromResult(new AuthResult(false, null, "Invalid Username or Password", null, null, Array.Empty<string>()));
    }
}`
  },
  {
    id: "platform-ldap-auth",
    path: "src/VMS.Platform/Authentication/LdapAuthenticationProvider.cs",
    name: "LdapAuthenticationProvider.cs",
    category: "platform",
    content: `using VMS.Platform.Abstractions.Authentication;

namespace VMS.Platform.Authentication;

public class LdapAuthenticationProvider : IAuthenticationProvider
{
    public Task<AuthResult> AuthenticateAsync(string username, string password, CancellationToken cancellationToken = default)
    {
        // LDAP/Active Directory verification skeleton simulation
        if (username.EndsWith("@vms.local") && password == "LdapSecure123")
        {
            var result = new AuthResult(
                Succeeded: true,
                Token: "vms-ldap-authenticated-token-simulation",
                ErrorMessage: null,
                DisplayName: "LDAP Auditor User",
                Email: username,
                Roles: new[] { "Auditor" }
            );
            return Task.FromResult(result);
        }

        return Task.FromResult(new AuthResult(false, null, "LDAP server could not authenticate credentials", null, null, Array.Empty<string>()));
    }
}`
  },
  {
    id: "platform-auth-factory",
    path: "src/VMS.Platform/Authentication/AuthenticationProviderFactory.cs",
    name: "AuthenticationProviderFactory.cs",
    category: "platform",
    content: `using Microsoft.Extensions.DependencyInjection;
using VMS.Platform.Abstractions.Authentication;

namespace VMS.Platform.Authentication;

public static class AuthenticationProviderFactory
{
    public static IServiceCollection AddVmsAuthentication(this IServiceCollection services, AuthOptions options)
    {
        if (options.Provider.Equals("LDAP", StringComparison.OrdinalIgnoreCase) || 
            options.Provider.Equals("LDAPS", StringComparison.OrdinalIgnoreCase))
        {
            services.AddSingleton<IAuthenticationProvider, LdapAuthenticationProvider>();
        }
        else
        {
            // Default to JSON Web Tokens
            services.AddSingleton<IAuthenticationProvider, JwtAuthenticationProvider>();
        }
        return services;
    }
}`
  },
  {
    id: "platform-aes-encryption",
    path: "src/VMS.Platform/Encryption/AesEncryptionProvider.cs",
    name: "AesEncryptionProvider.cs",
    category: "platform",
    content: `using System.Security.Cryptography;
using System.Text;
using VMS.Platform.Abstractions.Encryption;

namespace VMS.Platform.Encryption;

public class EncryptionOptions
{
    public const string SectionName = "Encryption";
    public string Key { get; set; } = "SuperSecretSecureKey123!VmsKey_"; // 32 chars for AES-256
}

public class AesEncryptionProvider : IEncryptionProvider
{
    private readonly byte[] _key;
    private readonly byte[] _iv = new byte[16]; // Real production should generate cryptographic IVs dynamically

    public AesEncryptionProvider(Microsoft.Extensions.Options.IOptions<EncryptionOptions> options)
    {
        _key = Encoding.UTF8.GetBytes(options.Value.Key.PadRight(32).Substring(0, 32));
    }

    public string Encrypt(string plainText)
    {
        using var aes = Aes.Create();
        aes.Key = _key;
        aes.IV = _iv;

        using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream();
        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
        {
            using (var sw = new StreamWriter(cs))
            {
                sw.Write(plainText);
            }
        }
        return Convert.ToBase64String(ms.ToArray());
    }

    public string Decrypt(string cipherText)
    {
        using var aes = Aes.Create();
        aes.Key = _key;
        aes.IV = _iv;

        using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream(Convert.FromBase64String(cipherText));
        using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        using var sr = new StreamReader(cs);

        return sr.ReadToEnd();
    }
}`
  },
  {
    id: "platform-storage",
    path: "src/VMS.Platform/Storage/FileSystemStorageProvider.cs",
    name: "FileSystemStorageProvider.cs",
    category: "platform",
    content: `using VMS.Platform.Abstractions.Storage;

namespace VMS.Platform.Storage;

public class StorageOptions
{
    public const string SectionName = "Storage";
    public string Provider { get; set; } = "Local"; // Local, AzureBlob, S3
    public string RootPath { get; set; } = "vms-uploads";
}

public class FileSystemStorageProvider : IStorageProvider
{
    private readonly string _rootPath;

    public FileSystemStorageProvider(Microsoft.Extensions.Options.IOptions<StorageOptions> options)
    {
        _rootPath = Path.Combine(Directory.GetCurrentDirectory(), options.Value.RootPath);
        if (!Directory.Exists(_rootPath))
        {
            Directory.CreateDirectory(_rootPath);
        }
    }

    public async Task SaveFileAsync(string path, Stream stream, CancellationToken cancellationToken = default)
    {
        var fullPath = Path.Combine(_rootPath, path);
        var dir = Path.GetDirectoryName(fullPath);
        if (dir != null && !Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        using var fileStream = File.Create(fullPath);
        await stream.CopyToAsync(fileStream, cancellationToken);
    }

    public Task<Stream> GetFileAsync(string path, CancellationToken cancellationToken = default)
    {
        var fullPath = Path.Combine(_rootPath, path);
        if (!File.Exists(fullPath))
        {
            throw new FileNotFoundException("Upload file could not be located", path);
        }

        return Task.FromResult<Stream>(File.OpenRead(fullPath));
    }

    public Task DeleteFileAsync(string path, CancellationToken cancellationToken = default)
    {
        var fullPath = Path.Combine(_rootPath, path);
        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
        }
        return Task.CompletedTask;
    }
}`
  },
  {
    id: "platform-notification",
    path: "src/VMS.Platform/Notification/SmtpNotificationProvider.cs",
    name: "SmtpNotificationProvider.cs",
    category: "platform",
    content: `using VMS.Platform.Abstractions.Notification;

namespace VMS.Platform.Notification;

public class NotificationOptions
{
    public const string SectionName = "Notification";
    public string Provider { get; set; } = "SMTP";
    public string SmtpHost { get; set; } = string.Empty;
    public int SmtpPort { get; set; } = 587;
    public string SmtpUsername { get; set; } = string.Empty;
    public string SmtpPassword { get; set; } = string.Empty;
}

public class SmtpNotificationProvider : INotificationProvider
{
    public Task SendEmailAsync(string to, string subject, string body, CancellationToken cancellationToken = default)
    {
        // Enterprise SMTP transmission simulation log
        Console.WriteLine($"[SMTP] Sending security report to {to}. Subject: {subject}");
        return Task.CompletedTask;
    }

    public Task SendSmsAsync(string number, string message, CancellationToken cancellationToken = default)
    {
        // Twilio / Carrier SMS transmission simulation log
        Console.WriteLine($"[SMS] Transmitting alert to {number}: {message}");
        return Task.CompletedTask;
    }
}`
  },
  {
    id: "platform-current-user",
    path: "src/VMS.Platform/CurrentUser/CurrentUserProvider.cs",
    name: "CurrentUserProvider.cs",
    category: "platform",
    content: `using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using VMS.Platform.Abstractions.CurrentUser;

namespace VMS.Platform.CurrentUser;

public class CurrentUserProvider : ICurrentUserProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserProvider(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    public string? Username => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value;
    public string? TenantId => _httpContextAccessor.HttpContext?.User?.FindFirst("tenant_id")?.Value ?? VMS.Shared.Constants.Constants.DefaultTenantId;

    public string[] Roles => _httpContextAccessor.HttpContext?.User?.FindAll(ClaimTypes.Role)
                                 .Select(r => r.Value).ToArray() ?? Array.Empty<string>();

    public bool IsInRole(string role)
    {
        return _httpContextAccessor.HttpContext?.User?.IsInRole(role) ?? false;
    }
}`
  },
  {
    id: "platform-audit",
    path: "src/VMS.Platform/Audit/DbAuditProvider.cs",
    name: "DbAuditProvider.cs",
    category: "platform",
    content: `using VMS.Platform.Abstractions.Audit;

namespace VMS.Platform.Audit;

public class DbAuditProvider : IAuditProvider
{
    public Task LogAsync(AuditEntry entry, CancellationToken cancellationToken = default)
    {
        // Enterprise persistence of security actions into Audit table
        Console.WriteLine($"[AUDIT LOG] {entry.Timestamp:yyyy-MM-dd HH:mm:ss} | User: {entry.UserId ?? "SYSTEM"} | Action: {entry.Action} | Type: {entry.EntityType} | Id: {entry.EntityId}");
        return Task.CompletedTask;
    }
}`
  },
  {
    id: "platform-feature-flags",
    path: "src/VMS.Platform/FeatureFlags/ConfigFeatureFlagsProvider.cs",
    name: "ConfigFeatureFlagsProvider.cs",
    category: "platform",
    content: `using Microsoft.Extensions.Configuration;
using VMS.Platform.Abstractions.FeatureFlags;

namespace VMS.Platform.FeatureFlags;

public class ConfigFeatureFlagsProvider : IFeatureFlagsProvider
{
    private readonly IConfiguration _configuration;

    public ConfigFeatureFlagsProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public Task<bool> IsEnabledAsync(string featureName, CancellationToken cancellationToken = default)
    {
        var status = _configuration.GetValue<bool>($"FeatureFlags:{featureName}");
        return Task.FromResult(status);
    }
}`
  },

  // --- VMS.INFRASTRUCTURE ---
  {
    id: "infrastructure-csproj",
    path: "src/VMS.Infrastructure/VMS.Infrastructure.csproj",
    name: "VMS.Infrastructure.csproj",
    category: "infrastructure",
    content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Hangfire.Core" Version="1.8.14" />
    <PackageReference Include="Hangfire.SqlServer" Version="1.8.14" />
    <PackageReference Include="Serilog.AspNetCore" Version="8.0.2" />
    <PackageReference Include="Serilog.Sinks.Console" Version="6.0.0" />
    <PackageReference Include="Serilog.Sinks.File" Version="6.0.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\VMS.Platform\\VMS.Platform.csproj" />
  </ItemGroup>
</Project>`
  },
  {
    id: "infra-middleware-correlation",
    path: "src/VMS.Infrastructure/Middleware/CorrelationIdMiddleware.cs",
    name: "CorrelationIdMiddleware.cs",
    category: "infrastructure",
    content: `using Microsoft.AspNetCore.Http;
using VMS.Shared.Constants;

namespace VMS.Infrastructure.Middleware;

public class CorrelationIdMiddleware
{
    private readonly RequestDelegate _next;

    public CorrelationIdMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue(Constants.CorrelationIdHeader, out var correlationId))
        {
            correlationId = Guid.NewGuid().ToString();
        }

        context.Items[Constants.CorrelationIdHeader] = correlationId.ToString();
        context.Response.Headers[Constants.CorrelationIdHeader] = correlationId.ToString();

        await _next(context);
    }
}`
  },
  {
    id: "infra-middleware-exception",
    path: "src/VMS.Infrastructure/Middleware/ExceptionMiddleware.cs",
    name: "ExceptionMiddleware.cs",
    category: "infrastructure",
    content: `using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Serilog;
using VMS.Shared.Constants;
using VMS.Shared.Models;

namespace VMS.Infrastructure.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, IHostEnvironment env)
    {
        _next = next;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var correlationId = context.Items.TryGetValue(Constants.CorrelationIdHeader, out var id) ? id?.ToString() : string.Empty;
        Log.Error(exception, "An unhandled exception occurred in VMS Pipeline. Correlation: {CorrelationId}", correlationId);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var message = _env.IsDevelopment() ? exception.Message : "A system breakdown occurred on our service host.";
        var response = ApiResponse<object>.CreateFailure(ErrorCodes.InternalServerError, message, correlationId ?? string.Empty);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}`
  },
  {
    id: "infra-middleware-logging",
    path: "src/VMS.Infrastructure/Middleware/RequestLoggingMiddleware.cs",
    name: "RequestLoggingMiddleware.cs",
    category: "infrastructure",
    content: `using Microsoft.AspNetCore.Http;
using Serilog;
using VMS.Shared.Constants;

namespace VMS.Infrastructure.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;

    public RequestLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId = context.Items.TryGetValue(Constants.CorrelationIdHeader, out var id) ? id?.ToString() : "N/A";
        
        Log.Information("HTTP Request Started. Path: {Path} | Method: {Method} | Correlation: {CorrelationId}", 
            context.Request.Path, context.Request.Method, correlationId);

        await _next(context);

        Log.Information("HTTP Request Completed. Code: {StatusCode} | Path: {Path} | Correlation: {CorrelationId}", 
            context.Response.StatusCode, context.Request.Path, correlationId);
    }
}`
  },
  {
    id: "infra-middleware-perf",
    path: "src/VMS.Infrastructure/Middleware/PerformanceLoggingMiddleware.cs",
    name: "PerformanceLoggingMiddleware.cs",
    category: "infrastructure",
    content: `using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Serilog;
using VMS.Shared.Constants;

namespace VMS.Infrastructure.Middleware;

public class PerformanceLoggingMiddleware
{
    private readonly RequestDelegate _next;

    public PerformanceLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        await _next(context);
        stopwatch.Stop();

        var elapsedMs = stopwatch.ElapsedMilliseconds;
        if (elapsedMs > 500) // Enterprise SLA Threshold Alert (500ms)
        {
            var correlationId = context.Items.TryGetValue(Constants.CorrelationIdHeader, out var id) ? id?.ToString() : "N/A";
            Log.Warning("VMS Performance SLA Breached! Path: {Path} | Method: {Method} | Duration: {Elapsed}ms | Correlation: {CorrelationId}",
                context.Request.Path, context.Request.Method, elapsedMs, correlationId);
        }
    }
}`
  },
  {
    id: "infra-hangfire",
    path: "src/VMS.Infrastructure/Hangfire/HangfireConfiguration.cs",
    name: "HangfireConfiguration.cs",
    category: "infrastructure",
    content: `using Hangfire;
using Microsoft.Extensions.DependencyInjection;

namespace VMS.Infrastructure.Hangfire;

public static class HangfireConfiguration
{
    public static IServiceCollection AddVmsHangfire(this IServiceCollection services, string connectionString)
    {
        services.AddHangfire(configuration => configuration
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            .UseSqlServerStorage(connectionString));

        services.AddHangfireServer();
        return services;
    }

    public static void ConfigureRecurringVmsJobs()
    {
        RecurringJob.AddOrUpdate<SampleRecurringJob>(
            "vms-asset-syncer",
            job => job.ExecuteScanSyncAsync(),
            Cron.Daily);
    }
}`
  },
  {
    id: "infra-hangfire-job",
    path: "src/VMS.Infrastructure/Hangfire/SampleRecurringJob.cs",
    name: "SampleRecurringJob.cs",
    category: "infrastructure",
    content: `using Serilog;

namespace VMS.Infrastructure.Hangfire;

public class SampleRecurringJob
{
    public Task ExecuteScanSyncAsync()
    {
        Log.Information("Recurring Job 'vms-asset-syncer' triggered. Pulling active vulnerability scanning feeds...");
        // Execution of asset vulnerability intelligence logic goes here
        return Task.CompletedTask;
    }
}`
  },

  // --- MODULES: ASSET ---
  {
    id: "asset-csproj",
    path: "src/Modules/Asset/Asset.csproj",
    name: "Asset.csproj",
    category: "module",
    content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Dapper" Version="2.1.35" />
    <PackageReference Include="Microsoft.AspNetCore.Builder" Version="9.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Http.Abstractions" Version="2.2.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\..\\VMS.Platform.Abstractions\\VMS.Platform.Abstractions.csproj" />
  </ItemGroup>
</Project>`
  },
  {
    id: "asset-db-context",
    path: "src/Modules/Asset/Sql/AssetDbContext.cs",
    name: "AssetDbContext.cs",
    category: "module",
    content: `using Microsoft.EntityFrameworkCore;

namespace Modules.Asset.Sql;

public class AssetEntity
{
    public Guid AssetID { get; set; }
    public string HostName { get; set; } = string.Empty;
    public string IPAddress { get; set; } = string.Empty;
    public string OperatingSystem { get; set; } = string.Empty;
    public string Criticality { get; set; } = "Medium"; // Low, Medium, High, Critical
    public string? CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AssetDbContext : DbContext
{
    public AssetDbContext(DbContextOptions<AssetDbContext> options) : base(options) { }

    public DbSet<AssetEntity> Assets => Set<AssetEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AssetEntity>(entity =>
        {
            entity.ToTable("Asset", "Asset");
            entity.HasKey(e => e.AssetID);
            entity.Property(e => e.HostName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.IPAddress).IsRequired().HasMaxLength(50);
            entity.Property(e => e.OperatingSystem).HasMaxLength(100);
            entity.Property(e => e.Criticality).HasMaxLength(20);
        });
    }
}`
  },
  {
    id: "asset-create-req",
    path: "src/Modules/Asset/Features/CreateAsset/CreateAssetRequest.cs",
    name: "CreateAssetRequest.cs",
    category: "module",
    content: `namespace Modules.Asset.Features.CreateAsset;

public record CreateAssetRequest(
    string HostName, 
    string IPAddress, 
    string OperatingSystem, 
    string Criticality
);`
  },
  {
    id: "asset-create-res",
    path: "src/Modules/Asset/Features/CreateAsset/CreateAssetResponse.cs",
    name: "CreateAssetResponse.cs",
    category: "module",
    content: `namespace Modules.Asset.Features.CreateAsset;

public record CreateAssetResponse(
    Guid AssetID, 
    string HostName, 
    string IPAddress, 
    string OperatingSystem, 
    string Criticality, 
    DateTime CreatedAt
);`
  },
  {
    id: "asset-create-val",
    path: "src/Modules/Asset/Features/CreateAsset/CreateAssetValidator.cs",
    name: "CreateAssetValidator.cs",
    category: "module",
    content: `using FluentValidation;
using VMS.Shared.Models;

namespace Modules.Asset.Features.CreateAsset;

public class CreateAssetValidator : BaseValidator<CreateAssetRequest>
{
    public CreateAssetValidator()
    {
        RuleFor(x => x.HostName)
            .NotEmpty().WithMessage("HostName is required.")
            .MaximumLength(255).WithMessage("HostName cannot exceed 255 characters.");

        RuleFor(x => x.IPAddress)
            .NotEmpty().WithMessage("IPAddress is required.")
            .Matches(@"^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$").WithMessage("IPAddress must be a valid IPv4 address.");

        RuleFor(x => x.Criticality)
            .Must(x => new[] { "Low", "Medium", "High", "Critical" }.Contains(x))
            .WithMessage("Criticality must be Low, Medium, High, or Critical.");
    }
}`
  },
  {
    id: "asset-create-map",
    path: "src/Modules/Asset/Features/CreateAsset/CreateAssetMapper.cs",
    name: "CreateAssetMapper.cs",
    category: "module",
    content: `using Modules.Asset.Sql;

namespace Modules.Asset.Features.CreateAsset;

public static class CreateAssetMapper
{
    public static AssetEntity MapToEntity(CreateAssetRequest request, string? user) => new()
    {
        AssetID = Guid.NewGuid(),
        HostName = request.HostName,
        IPAddress = request.IPAddress,
        OperatingSystem = request.OperatingSystem,
        Criticality = request.Criticality,
        CreatedBy = user,
        CreatedAt = DateTime.UtcNow
    };

    public static CreateAssetResponse MapToResponse(AssetEntity entity) => new(
        entity.AssetID,
        entity.HostName,
        entity.IPAddress,
        entity.OperatingSystem,
        entity.Criticality,
        entity.CreatedAt
    );
}`
  },
  {
    id: "asset-create-handler",
    path: "src/Modules/Asset/Features/CreateAsset/CreateAssetHandler.cs",
    name: "CreateAssetHandler.cs",
    category: "module",
    content: `using Microsoft.EntityFrameworkCore;
using Modules.Asset.Sql;
using VMS.Platform.Abstractions.CurrentUser;
using VMS.Platform.Abstractions.Database;
using VMS.Platform.Abstractions.Audit;
using VMS.Shared.Models;
using VMS.Shared.Constants;

namespace Modules.Asset.Features.CreateAsset;

public class CreateAssetHandler
{
    private readonly AssetDbContext _dbContext;
    private readonly ICurrentUserProvider _userProvider;
    private readonly IAuditProvider _auditProvider;

    public CreateAssetHandler(AssetDbContext dbContext, ICurrentUserProvider userProvider, IAuditProvider auditProvider)
    {
        _dbContext = dbContext;
        _userProvider = userProvider;
        _auditProvider = auditProvider;
    }

    public async Task<Result<CreateAssetResponse>> HandleAsync(CreateAssetRequest request, CancellationToken cancellationToken = default)
    {
        // 1. Audit unique HostName check via Entity Framework
        var duplicateExists = await _dbContext.Assets.AnyAsync(a => a.HostName == request.HostName, cancellationToken);
        if (duplicateExists)
        {
            return Result<CreateAssetResponse>.Failure(ErrorCodes.Asset.DuplicateHostName, "An asset with this HostName already exists in the system.");
        }

        // 2. Perform write operation
        var entity = CreateAssetMapper.MapToEntity(request, _userProvider.Username);
        _dbContext.Assets.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // 3. Register Security Audit Trail log
        await _auditProvider.LogAsync(new AuditEntry(
            Action: "CreateAsset",
            EntityType: "Asset",
            EntityId: entity.AssetID.ToString(),
            Details: $"Created host {entity.HostName} with IP {entity.IPAddress} and criticality {entity.Criticality}",
            UserId: _userProvider.UserId,
            Timestamp: DateTime.UtcNow
        ), cancellationToken);

        return Result<CreateAssetResponse>.Success(CreateAssetMapper.MapToResponse(entity));
    }
}`
  },
  {
    id: "asset-create-endpoint",
    path: "src/Modules/Asset/Features/CreateAsset/CreateAssetEndpoint.cs",
    name: "CreateAssetEndpoint.cs",
    category: "module",
    content: `using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using VMS.Shared.Models;
using VMS.Shared.Constants;
using FluentValidation;

namespace Modules.Asset.Features.CreateAsset;

public static class CreateAssetEndpoint
{
    public static void MapCreateAsset(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/api/assets", async (
            CreateAssetRequest request,
            CreateAssetValidator validator,
            CreateAssetHandler handler,
            HttpContext context) =>
        {
            var correlationId = context.Items[Constants.CorrelationIdHeader]?.ToString() ?? string.Empty;

            // Run FluentValidation rules
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                var errors = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
                return Results.BadRequest(ApiResponse<object>.CreateFailure(ErrorCodes.ValidationError, errors, correlationId));
            }

            var result = await handler.HandleAsync(request);
            if (!result.Succeeded)
            {
                return Results.BadRequest(ApiResponse<object>.CreateFailure(result.ErrorCode!, result.ErrorMessage!, correlationId));
            }

            return Results.Ok(ApiResponse<CreateAssetResponse>.CreateSuccess(result.Value!, correlationId));
        })
        .WithName("CreateAsset")
        .WithTags("Assets");
    }
}`
  },
  {
    id: "asset-search-req",
    path: "src/Modules/Asset/Features/SearchAsset/SearchAssetRequest.cs",
    name: "SearchAssetRequest.cs",
    category: "module",
    content: `using VMS.Shared.Models;

namespace Modules.Asset.Features.SearchAsset;

public class SearchAssetRequest : PaginationFilter
{
    public string? SearchTerm { get; set; }
    public string? Criticality { get; set; }
}`
  },
  {
    id: "asset-search-res",
    path: "src/Modules/Asset/Features/SearchAsset/SearchAssetResponse.cs",
    name: "SearchAssetResponse.cs",
    category: "module",
    content: `namespace Modules.Asset.Features.SearchAsset;

public record SearchAssetResponse(
    Guid AssetID, 
    string HostName, 
    string IPAddress, 
    string OperatingSystem, 
    string Criticality, 
    DateTime CreatedAt
);`
  },
  {
    id: "asset-search-map",
    path: "src/Modules/Asset/Features/SearchAsset/SearchAssetMapper.cs",
    name: "SearchAssetMapper.cs",
    category: "module",
    content: `namespace Modules.Asset.Features.SearchAsset;

public static class SearchAssetMapper
{
    public static IEnumerable<SearchAssetResponse> MapFromRows(dynamic rows)
    {
        var list = new List<SearchAssetResponse>();
        foreach (var row in rows)
        {
            list.Add(new SearchAssetResponse(
                row.AssetID,
                row.HostName,
                row.IPAddress,
                row.OperatingSystem,
                row.Criticality,
                row.CreatedAt
            ));
        }
        return list;
    }
}`
  },
  {
    id: "asset-search-handler",
    path: "src/Modules/Asset/Features/SearchAsset/SearchAssetHandler.cs",
    name: "SearchAssetHandler.cs",
    category: "module",
    content: `using Dapper;
using System.Data;
using VMS.Platform.Abstractions.Database;
using VMS.Shared.Models;

namespace Modules.Asset.Features.SearchAsset;

public class SearchAssetHandler
{
    private readonly IDbConnectionFactory _connectionFactory;

    public SearchAssetHandler(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<PagedResponse<SearchAssetResponse>> HandleAsync(SearchAssetRequest request, CancellationToken cancellationToken = default)
    {
        // 1. Establish connection via Router-supported factory (Routes to Read Replica)
        using var connection = _connectionFactory.CreateConnection();

        // 2. Call optimized SQL Server Stored Procedure using Dapper
        var parameters = new DynamicParameters();
        parameters.Add("@SearchTerm", request.SearchTerm);
        parameters.Add("@Criticality", request.Criticality);
        parameters.Add("@PageIndex", request.PageIndex);
        parameters.Add("@PageSize", request.PageSize);
        parameters.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

        var queryResult = await connection.QueryAsync(
            sql: "Asset.usp_SearchAsset",
            param: parameters,
            commandType: CommandType.StoredProcedure
        );

        var assets = SearchAssetMapper.MapFromRows(queryResult);
        var totalCount = parameters.Get<int>("@TotalCount");

        return PagedResponse<SearchAssetResponse>.CreatePaged(
            data: assets,
            totalCount: totalCount,
            pageIndex: request.PageIndex,
            pageSize: request.PageSize
        );
    }
}`
  },
  {
    id: "asset-search-endpoint",
    path: "src/Modules/Asset/Features/SearchAsset/SearchAssetEndpoint.cs",
    name: "SearchAssetEndpoint.cs",
    category: "module",
    content: `using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using VMS.Shared.Constants;

namespace Modules.Asset.Features.SearchAsset;

public static class SearchAssetEndpoint
{
    public static void MapSearchAsset(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/assets", async (
            [AsParameters] SearchAssetRequest request,
            SearchAssetHandler handler,
            HttpContext context) =>
        {
            var correlationId = context.Items[Constants.CorrelationIdHeader]?.ToString() ?? string.Empty;
            
            var pagedResponse = await handler.HandleAsync(request);
            pagedResponse.CorrelationId = correlationId;

            return Results.Ok(pagedResponse);
        })
        .WithName("SearchAsset") // Critical: Maps to router ReadMethods list
        .WithTags("Assets");
    }
}`
  },
  {
    id: "asset-module-extensions",
    path: "src/Modules/Asset/AssetModuleExtensions.cs",
    name: "AssetModuleExtensions.cs",
    category: "module",
    content: `using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Modules.Asset.Sql;
using Modules.Asset.Features.CreateAsset;
using Modules.Asset.Features.SearchAsset;
using VMS.Platform.Abstractions.Database;

namespace Modules.Asset;

public static class AssetModuleExtensions
{
    public static IServiceCollection AddAssetModule(this IServiceCollection services)
    {
        // EF Core connection utilizing database routing options
        services.AddDbContext<AssetDbContext>((serviceProvider, options) =>
        {
            var dbRouter = serviceProvider.GetRequiredService<IDatabaseRouter>();
            options.UseSqlServer(dbRouter.GetConnectionString());
        });

        // Handlers & Validators DI setup
        services.AddScoped<CreateAssetHandler>();
        services.AddSingleton<CreateAssetValidator>();
        services.AddScoped<SearchAssetHandler>();

        return services;
    }

    public static void MapAssetEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapCreateAsset();
        endpoints.MapSearchAsset();
    }
}`
  },

  // --- VMS.API ---
  {
    id: "api-csproj",
    path: "src/VMS.Api/VMS.Api.csproj",
    name: "VMS.Api.csproj",
    category: "api",
    content: `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\\VMS.Infrastructure\\VMS.Infrastructure.csproj" />
    <ProjectReference Include="..\\Modules\\Asset\\Asset.csproj" />
  </ItemGroup>
</Project>`
  },
  {
    id: "api-appsettings",
    path: "src/VMS.Api/appsettings.json",
    name: "appsettings.json",
    category: "api",
    content: `{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Database": {
    "Provider": "SqlServer",
    "WriteConnectionString": "Server=tcp:sql-primary.vms.internal,1433;Database=VmsDb;User ID=sa_vms_app;Password=P@ssw0rdSecureWrite!;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;",
    "ReadConnectionString": "Server=tcp:sql-replica.vms.internal,1433;Database=VmsDb;User ID=sa_vms_reader;Password=P@ssw0rdSecureRead!;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;",
    "ReadMethods": [
      "SearchAsset",
      "GetDashboard",
      "GetAsset"
    ]
  },
  "Cache": {
    "Provider": "Memory",
    "ConnectionString": "127.0.0.1:6379,password=VmsRedisSecurePass123"
  },
  "Authentication": {
    "Provider": "JWT",
    "Jwt": {
      "Secret": "EnterpriseVmsSuperSecretKeySigningTokenMustBeSecure256BitAndUnique",
      "Issuer": "https://identity.vms.local",
      "Audience": "https://api.vms.local",
      "ExpiryInMinutes": 120
    },
    "Ldap": {
      "Server": "ldap.vms.local",
      "Port": 636,
      "UseSsl": true
    }
  },
  "Encryption": {
    "Key": "SecureSymEncryptionKey32CharsForAES"
  },
  "Storage": {
    "Provider": "Local",
    "RootPath": "vms-local-files"
  },
  "Notification": {
    "Provider": "SMTP",
    "SmtpHost": "smtp.sendgrid.net",
    "SmtpPort": 587,
    "SmtpUsername": "apikey",
    "SmtpPassword": "SG.EnterpriseVmsSMTPPasswordSimulation"
  },
  "FeatureFlags": {
    "EnableAutomaticAssetDiscovery": true,
    "StrictAuditLogging": true,
    "UseValkeyConnector": false
  }
}`
  },
  {
    id: "api-program",
    path: "src/VMS.Api/Program.cs",
    name: "Program.cs",
    category: "api",
    content: `using Microsoft.OpenApi.Models;
using Serilog;
using VMS.Platform.Database;
using VMS.Platform.Cache;
using VMS.Platform.Authentication;
using VMS.Platform.Encryption;
using VMS.Platform.Storage;
using VMS.Platform.Notification;
using VMS.Platform.CurrentUser;
using VMS.Platform.Audit;
using VMS.Platform.FeatureFlags;
using VMS.Platform.Abstractions.Database;
using VMS.Platform.Abstractions.Cache;
using VMS.Platform.Abstractions.Authentication;
using VMS.Platform.Abstractions.Encryption;
using VMS.Platform.Abstractions.Storage;
using VMS.Platform.Abstractions.Notification;
using VMS.Platform.Abstractions.CurrentUser;
using VMS.Platform.Abstractions.Audit;
using VMS.Platform.Abstractions.FeatureFlags;
using VMS.Infrastructure.Middleware;
using VMS.Infrastructure.Hangfire;
using Modules.Asset;

var builder = WebApplication.CreateBuilder(args);

// 1. Setup Serilog Integration
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
    .WriteTo.File("logs/vms-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

try
{
    Log.Information("Initiating Web API container startup...");

    // 2. Bind Platform Configuration Settings
    builder.Services.Configure<DatabaseOptions>(builder.Configuration.GetSection(DatabaseOptions.SectionName));
    builder.Services.Configure<EncryptionOptions>(builder.Configuration.GetSection(EncryptionOptions.SectionName));
    builder.Services.Configure<StorageOptions>(builder.Configuration.GetSection(StorageOptions.SectionName));
    builder.Services.Configure<NotificationOptions>(builder.Configuration.GetSection(NotificationOptions.SectionName));
    builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection(AuthOptions.SectionName));

    // 3. Register Platform Services & Core Providers
    builder.Services.AddHttpContextAccessor();
    builder.Services.AddSingleton<IDatabaseRouter, DatabaseRouter>();
    builder.Services.AddSingleton<IDbConnectionFactory, SqlConnectionFactory>();

    // Caching Strategy Injection
    var cacheSettings = builder.Configuration.GetSection(CacheOptions.SectionName).Get<CacheOptions>() ?? new();
    builder.Services.AddVmsCaching(cacheSettings);

    // Authentication Provider Injection
    var authSettings = builder.Configuration.GetSection(AuthOptions.SectionName).Get<AuthOptions>() ?? new();
    builder.Services.AddVmsAuthentication(authSettings);

    builder.Services.AddSingleton<IEncryptionProvider, AesEncryptionProvider>();
    builder.Services.AddSingleton<IStorageProvider, FileSystemStorageProvider>();
    builder.Services.AddSingleton<INotificationProvider, SmtpNotificationProvider>();
    builder.Services.AddScoped<ICurrentUserProvider, CurrentUserProvider>();
    builder.Services.AddScoped<IAuditProvider, DbAuditProvider>();
    builder.Services.AddSingleton<IFeatureFlagsProvider, ConfigFeatureFlagsProvider>();

    // 4. Inject Hangfire background job host
    var dbOptions = builder.Configuration.GetSection(DatabaseOptions.SectionName).Get<DatabaseOptions>();
    if (dbOptions != null && !string.IsNullOrEmpty(dbOptions.WriteConnectionString))
    {
        builder.Services.AddVmsHangfire(dbOptions.WriteConnectionString);
    }

    // 5. Load Domain Modules (Modular Monolith architecture)
    builder.Services.AddAssetModule();

    // 6. Register Swagger Documentation
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "VMS Enterprise Core API Portal", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header utilizing standard Bearer scheme.",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                },
                Array.Empty<string>()
            }
        });
    });

    // 7. Inject Custom ASP.NET Health Checks
    builder.Services.AddHealthChecks()
        .AddSqlServer(dbOptions?.WriteConnectionString ?? "", name: "primary-db")
        .AddSqlServer(dbOptions?.ReadConnectionString ?? "", name: "replica-db");

    var app = builder.Build();

    // 8. Configure Custom Pipelines (Middleware stack)
    app.UseMiddleware<CorrelationIdMiddleware>();
    app.UseMiddleware<RequestLoggingMiddleware>();
    app.UseMiddleware<PerformanceLoggingMiddleware>();
    app.UseMiddleware<ExceptionMiddleware>();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VMS API v1"));
    }

    app.UseHttpsRedirection();

    // Use Health checks route
    app.MapHealthChecks("/health");

    // Enable Hangfire Scheduler Dashboard (Security: restricted to Admin in prod)
    app.UseHangfireDashboard("/hangfire");
    HangfireConfiguration.ConfigureRecurringVmsJobs();

    // 9. Map Domain Modular Monolith Feature Endpoints
    app.MapAssetEndpoints();

    Log.Information("Enterprise VMS Solution container successfully routed. Listening on host port 3000.");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly during boot configuration.");
}
finally
{
    Log.CloseAndFlush();
}
`
  },

  // --- DATABASE SCRIPTS ---
  {
    id: "db-schema",
    path: "database/Schemas/Asset.sql",
    name: "Asset.sql",
    category: "database",
    content: `-- Create Domain Schema
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'Asset')
BEGIN
    EXEC('CREATE SCHEMA [Asset]')
END
GO`
  },
  {
    id: "db-table",
    path: "database/Tables/Asset.Asset.sql",
    name: "Asset.Asset.sql",
    category: "database",
    content: `-- Asset Domain Entity Table
CREATE TABLE [Asset].[Asset] (
    [AssetID] UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Asset_AssetID PRIMARY KEY CLUSTERED,
    [HostName] VARCHAR(255) NOT NULL,
    [IPAddress] VARCHAR(50) NOT NULL,
    [OperatingSystem] VARCHAR(100) NOT NULL,
    [Criticality] VARCHAR(20) NOT NULL CONSTRAINT DF_Asset_Criticality DEFAULT 'Medium',
    [CreatedBy] VARCHAR(100) NULL,
    [CreatedAt] DATETIME NOT NULL CONSTRAINT DF_Asset_CreatedAt DEFAULT GETUTCDATE(),
    
    CONSTRAINT UQ_Asset_HostName UNIQUE ([HostName]),
    CONSTRAINT CK_Asset_Criticality CHECK ([Criticality] IN ('Low', 'Medium', 'High', 'Critical'))
);
GO

-- Create High-Performance Non-Clustered Indexes
CREATE NONCLUSTERED INDEX IX_Asset_Criticality ON [Asset].[Asset] ([Criticality]);
CREATE NONCLUSTERED INDEX IX_Asset_IPAddress ON [Asset].[Asset] ([IPAddress]);
GO`
  },
  {
    id: "db-sp",
    path: "database/StoredProcedures/Asset.usp_SearchAsset.sql",
    name: "Asset.usp_SearchAsset.sql",
    category: "database",
    content: `IF OBJECT_ID('Asset.usp_SearchAsset', 'P') IS NOT NULL
    DROP PROCEDURE Asset.usp_SearchAsset
GO

CREATE PROCEDURE Asset.usp_SearchAsset
    @SearchTerm VARCHAR(255) = NULL,
    @Criticality VARCHAR(20) = NULL,
    @PageIndex INT = 1,
    @PageSize INT = 10,
    @TotalCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Calculate exact row boundaries
    DECLARE @Offset INT = (@PageIndex - 1) * @PageSize;

    -- Retrieve total matching records
    SELECT @TotalCount = COUNT(*)
    FROM [Asset].[Asset]
    WHERE (@SearchTerm IS NULL OR [HostName] LIKE '%' + @SearchTerm + '%' OR [IPAddress] LIKE '%' + @SearchTerm + '%')
      AND (@Criticality IS NULL OR [Criticality] = @Criticality);

    -- Optimized pagination query using standard SQL server offset
    SELECT 
        [AssetID],
        [HostName],
        [IPAddress],
        [OperatingSystem],
        [Criticality],
        [CreatedAt]
    FROM [Asset].[Asset]
    WHERE (@SearchTerm IS NULL OR [HostName] LIKE '%' + @SearchTerm + '%' OR [IPAddress] LIKE '%' + @SearchTerm + '%')
      AND (@Criticality IS NULL OR [Criticality] = @Criticality)
    ORDER BY [CreatedAt] DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
GO`
  },
  {
    id: "db-seed",
    path: "database/Seed/SeedData.sql",
    name: "SeedData.sql",
    category: "database",
    content: `-- Seed initial reference assets for POC verification
INSERT INTO [Asset].[Asset] ([AssetID], [HostName], [IPAddress], [OperatingSystem], [Criticality], [CreatedBy], [CreatedAt])
VALUES 
(NEWID(), 'vms-prod-db-01', '10.100.1.5', 'Ubuntu 22.04 LTS', 'Critical', 'system', GETUTCDATE()),
(NEWID(), 'vms-web-server-prod', '10.100.2.12', 'Windows Server 2022', 'High', 'system', GETUTCDATE()),
(NEWID(), 'vms-dev-sandbox-04', '192.168.4.55', 'CentOS Stream 9', 'Low', 'system', GETUTCDATE()),
(NEWID(), 'vms-stage-api-01', '10.100.5.21', 'RedHat Enterprise Linux 9', 'Medium', 'system', GETUTCDATE());
GO`
  },

  // --- DOCS & README ---
  {
    id: "readme-md",
    path: "README.md",
    name: "README.md",
    category: "docs",
    content: `# VMS Enterprise Solution Skeleton

This repository represents a high-grade production-ready solution skeleton for a commercial **Vulnerability Management System (VMS)** utilizing .NET 10. It is engineered with a **Modular Monolith** architecture and uses a **Vertical Slice / Provider-Based Platform** structure.

## Architectural Guidelines

- **No Clean Architecture Boilerplate**: Avoid multi-layered repository/service overhead. Endpoints directly invoke Handlers containing the actual business logic.
- **Data Access Strategy**:
  - **Writes (Create, Update, Delete)**: Done using **Entity Framework Core** DbContext directly inside the handlers (No Generic Repository).
  - **Reads/Searches**: Highly-optimized queries utilizing **Dapper** invoking structured Stored Procedures.
- **Provider-Based Platform Abstractions**: Core capabilities like Database Connections, Caching, Encryption, Notification, and Feature Flags are defined as unified interfaces in \`VMS.Platform.Abstractions\` with pluggable configuration-driven implementations in \`VMS.Platform\`.

---

## Technical Features

### 1. Database Connection Routing

The platform implements a smart \`DatabaseRouter\` targeting two distinct connection strings: **WriteDb** (Primary SQL Server) and **ReadDb** (Replica SQL Server). 
- Routing is completely transparent to the business domain.
- The router parses HTTP Request types: **HTTP GET** methods are automatically routed to the Read replica.
- Advanced endpoint name routing maps matching strings inside the configurable \`ReadMethods\` collection (e.g., \`SearchAsset\`) to target the read replica as well.

### 2. Multi-Provider Caching

Supports unified \`ICacheProvider\` with:
- **Memory Provider**: Low-latency, client-side caching.
- **Redis & Valkey Provider**: Highly scalable, distributed shared cache.
Configuration is fully dynamic inside \`appsettings.json\`.

### 3. Identity & Authentication Integration

The solution features adaptive \`IAuthenticationProvider\` supporting JWT and LDAP/Active Directory protocols out-of-the-box.

---

## Setup & Running Guide

### Step 1: Initialize Database
Execute the SQL files inside the \`database/\` folder on your SQL Server instance in this order:
1. \`database/Schemas/Asset.sql\`
2. \`database/Tables/Asset.Asset.sql\`
3. \`database/StoredProcedures/Asset.usp_SearchAsset.sql\`
4. \`database/Seed/SeedData.sql\`

### Step 2: Configure Environment Connection
Modify \`appsettings.json\` to bind your actual primary and secondary replica databases:
\`\`\`json
"Database": {
  "Provider": "SqlServer",
  "WriteConnectionString": "YOUR_PRIMARY_SQL_SERVER_CONNECTION_STRING",
  "ReadConnectionString": "YOUR_READ_REPLICA_CONNECTION_STRING"
}
\`\`\`

### Step 3: Run the Application
Run using the .NET 10 CLI inside the \`src/VMS.Api\` folder:
\`\`\`bash
dotnet run
\`\`\`

---

## Extension Guidelines

### How to Add a New Business Module
1. Create a new directory under \`src/Modules/\` (e.g., \`Vulnerability\`).
2. Add a standard \`Vulnerability.csproj\` file targeting \`net10.0\` referencing \`VMS.Platform.Abstractions\`.
3. Add a unified extension registrar class, e.g., \`VulnerabilityModuleExtensions.cs\` implementing DI and route registrations.
4. Add your feature folders containing \`Request\`, \`Response\`, \`Handler\`, and \`Endpoint\` files.
5. Reference the new module project from \`VMS.Api.csproj\` and call \`services.AddVulnerabilityModule()\` in \`Program.cs\`.
`
  }
];
