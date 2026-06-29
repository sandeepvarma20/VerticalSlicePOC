import React, { useState, useMemo } from "react";
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  Terminal, 
  Settings, 
  Play, 
  Download, 
  Copy, 
  Plus, 
  Check, 
  AlertCircle, 
  Database, 
  Search, 
  Share2, 
  FileText, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  BookOpen,
  Edit,
  Save,
  RefreshCw,
  Clock,
  ListFilter
} from "lucide-react";
import JSZip from "jszip";
import { solutionFiles, SolutionFile } from "./solutionData";

// Mock Database State for the Simulator
interface SimulatedAsset {
  AssetID: string;
  HostName: string;
  IPAddress: string;
  OperatingSystem: string;
  Criticality: string;
  CreatedBy: string;
  CreatedAt: string;
}

const initialDbAssets: SimulatedAsset[] = [
  {
    AssetID: "8c80beaa-a7b0-41ab-88cf-4e2845d8250d",
    HostName: "vms-prod-db-01",
    IPAddress: "10.100.1.5",
    OperatingSystem: "Ubuntu 22.04 LTS",
    Criticality: "Critical",
    CreatedBy: "system",
    CreatedAt: "2026-06-29T03:00:00Z"
  },
  {
    AssetID: "2b92ee8a-442c-47bc-ba91-09eeaa41b9e8",
    HostName: "vms-web-server-prod",
    IPAddress: "10.100.2.12",
    OperatingSystem: "Windows Server 2022",
    Criticality: "High",
    CreatedBy: "system",
    CreatedAt: "2026-06-29T03:01:00Z"
  },
  {
    AssetID: "5c83bfa1-bcda-411a-88ea-003a3bfa22f1",
    HostName: "vms-stage-api-01",
    IPAddress: "10.100.5.21",
    OperatingSystem: "RedHat Enterprise Linux 9",
    Criticality: "Medium",
    CreatedBy: "system",
    CreatedAt: "2026-06-29T03:02:00Z"
  }
];

export default function App() {
  // Solution Files state
  const [files, setFiles] = useState<SolutionFile[]>(solutionFiles);
  const [selectedFileId, setSelectedFileId] = useState<string>("api-program");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Expanded folders state (paths that are expanded)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "src": true,
    "src/VMS.Api": true,
    "src/VMS.Platform.Abstractions": true,
    "src/VMS.Platform": true,
    "src/VMS.Infrastructure": true,
    "src/VMS.Shared": true,
    "src/Modules": true,
    "src/Modules/Asset": true,
    "database": true,
  });

  // Current selected tab: "editor" or "simulator"
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"editor" | "simulator">("simulator");

  // Config State (synced with appsettings.json dynamically!)
  const [dbProvider, setDbProvider] = useState<string>("SqlServer");
  const [cacheProvider, setCacheProvider] = useState<string>("Memory");
  const [authProvider, setAuthProvider] = useState<string>("JWT");
  const [readMethods, setReadMethods] = useState<string[]>(["SearchAsset", "GetDashboard", "GetAsset"]);
  const [writeConnString, setWriteConnString] = useState<string>(
    "Server=tcp:sql-primary.vms.internal,1433;Database=VmsDb;User ID=sa_vms_app;Password=P@ssw0rdSecureWrite!;"
  );
  const [readConnString, setReadConnString] = useState<string>(
    "Server=tcp:sql-replica.vms.internal,1433;Database=VmsDb;User ID=sa_vms_reader;Password=P@ssw0rdSecureRead!;"
  );
  const [encryptionKey, setEncryptionKey] = useState<string>("SecureSymEncryptionKey32CharsForAES");
  const [jwtSecret, setJwtSecret] = useState<string>("EnterpriseVmsSuperSecretKeySigningTokenMustBeSecure256BitAndUnique");

  // Live Database Simulated State
  const [simulatedAssets, setSimulatedAssets] = useState<SimulatedAsset[]>(initialDbAssets);
  const [simulationLogs, setSimulationLogs] = useState<Array<{ timestamp: string; level: 'INFO' | 'WARN' | 'SUCCESS' | 'AUDIT'; message: string }>>([
    { timestamp: "10:02:45", level: "INFO", message: "VMS Enterprise Code Gateway started. Diagnostic health-checks initialized." },
    { timestamp: "10:02:46", level: "INFO", message: "Hangfire Scheduler started in background container. recurring scan syncer registered." }
  ]);
  const [auditLogs, setAuditLogs] = useState<Array<{ action: string; type: string; id: string; details: string; user: string; timestamp: string }>>([
    { action: "Init", type: "System", id: "SYSTEM", details: "VMS Platform Core Initialized with Memory Caching Provider.", user: "SYSTEM", timestamp: "2026-06-29T03:00:00" }
  ]);

  // Simulator Inputs
  const [simSearchTerm, setSimSearchTerm] = useState<string>("");
  const [simCriticality, setSimCriticality] = useState<string>("");
  const [newHostName, setNewHostName] = useState<string>("");
  const [newIPAddress, setNewIPAddress] = useState<string>("");
  const [newOS, setNewOS] = useState<string>("Ubuntu 24.04 LTS");
  const [newCriticality, setNewCriticality] = useState<string>("Medium");
  const [simUser, setSimUser] = useState<string>("admin");
  const [simPassword, setSimPassword] = useState<string>("P@ssword123");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authRoles, setAuthRoles] = useState<string[]>(["GlobalAdmin", "SecurityAnalyst"]);

  // Active File object
  const activeFile = useMemo(() => {
    return files.find(f => f.id === selectedFileId) || files[0];
  }, [files, selectedFileId]);

  // Initialize edited content when active file changes
  React.useEffect(() => {
    setEditedContent(activeFile.content);
    setIsEditing(false);
  }, [activeFile]);

  // Sync state changes back to appsettings.json file!
  const syncConfigToAppSettings = () => {
    const appsettingsFile = files.find(f => f.id === "api-appsettings");
    if (appsettingsFile) {
      try {
        const configObj = JSON.parse(appsettingsFile.content);
        configObj.Database.Provider = dbProvider;
        configObj.Database.WriteConnectionString = writeConnString;
        configObj.Database.ReadConnectionString = readConnString;
        configObj.Database.ReadMethods = readMethods;
        configObj.Cache.Provider = cacheProvider;
        configObj.Authentication.Provider = authProvider;
        configObj.Encryption.Key = encryptionKey;
        configObj.Authentication.Jwt.Secret = jwtSecret;

        const updatedContent = JSON.stringify(configObj, null, 2);
        setFiles(prev => prev.map(f => f.id === "api-appsettings" ? { ...f, content: updatedContent } : f));
        
        // Output log
        addLog("INFO", `Configuration updated & hot-reloaded! appsettings.json modified and providers refactored.`);
      } catch (err) {
        console.error("Error parsing/writing appsettings", err);
      }
    }
  };

  // Trigger sync whenever dependent configs change
  React.useEffect(() => {
    syncConfigToAppSettings();
  }, [dbProvider, cacheProvider, authProvider, readMethods, writeConnString, readConnString, encryptionKey, jwtSecret]);

  const addLog = (level: 'INFO' | 'WARN' | 'SUCCESS' | 'AUDIT', message: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setSimulationLogs(prev => [
      ...prev,
      { timestamp: timeStr, level, message }
    ]);
  };

  // Directory builder helper
  const fileTreeStructure = useMemo(() => {
    const tree: any = {};
    files.forEach(f => {
      const parts = f.path.split('/');
      let current = tree;
      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = {
            _isFile: index === parts.length - 1,
            _fileId: index === parts.length - 1 ? f.id : null,
            _fullPath: parts.slice(0, index + 1).join('/'),
            children: {}
          };
        }
        current = current[part].children;
      });
    });
    return tree;
  }, [files]);

  // Handler for directory expansion toggle
  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Copy current code
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Save changes to code in memory
  const handleSaveChanges = () => {
    setFiles(prev => prev.map(f => f.id === selectedFileId ? { ...f, content: editedContent } : f));
    setIsEditing(false);
    addLog("SUCCESS", `File successfully saved and hot-recompiled: ${activeFile.name}`);
  };

  // Download a single file
  const handleDownloadFile = (file: SolutionFile) => {
    const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ZIP EXPORTER (The pièce de résistance)
  const handleExportFullSolution = async () => {
    setIsExporting(true);
    addLog("INFO", "Compiling .NET 10 solution modules & project graphs for bundle compression...");
    
    try {
      const zip = new JSZip();
      
      // Pack all files into JSZip using their correct relative paths
      files.forEach(f => {
        // Normalize slashes for Windows/VS compatibility
        const zipPath = f.path.replace(/\//g, "\\");
        zip.file(zipPath, f.content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "VMS_Enterprise_Solution_Skeleton.zip";
      link.click();
      URL.revokeObjectURL(url);

      addLog("SUCCESS", "Solution skeleton packaged successfully! VMS_Enterprise_Solution_Skeleton.zip downloaded.");
    } catch (err: any) {
      addLog("WARN", `Packaging failed: ${err?.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };

  // SIMULATOR ACTION: AUTH / LOGIN
  const handleSimAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    addLog("INFO", `Invoking IAuthenticationProvider.AuthenticateAsync() [Active Provider: ${authProvider}]`);
    
    if (authProvider === "JWT") {
      if (simUser === "admin" && simPassword === "P@ssword123") {
        setIsAuthenticated(true);
        setAuthRoles(["GlobalAdmin", "SecurityAnalyst"]);
        addLog("SUCCESS", `JWT Authentication succeeded. Granted roles: GlobalAdmin, SecurityAnalyst. Signature generated using configured secret key.`);
      } else {
        setIsAuthenticated(false);
        addLog("WARN", `JWT Authentication failed: Invalid Username or Password.`);
      }
    } else if (authProvider === "LDAP") {
      if (simUser.endsWith("@vms.local") && simPassword === "LdapSecure123") {
        setIsAuthenticated(true);
        setAuthRoles(["Auditor"]);
        addLog("SUCCESS", `LDAP Directory connection established. Credentials validated on secure server. Granted role: Auditor.`);
      } else {
        setIsAuthenticated(false);
        addLog("WARN", `LDAP Authentication failed: LDAP server could not authenticate or match domain suffix.`);
      }
    }
  };

  // SIMULATOR ACTION: SEARCH ASSET (DAPPER + DATABASE ROUTER)
  const handleSimSearch = () => {
    addLog("INFO", `Initiating GET /api/assets request [SearchTerm: "${simSearchTerm}", Criticality: "${simCriticality}"]`);
    addLog("INFO", "Executing CorrelationIdMiddleware: Set X-Correlation-Id header.");
    addLog("INFO", "Executing RequestLoggingMiddleware: Logged path '/api/assets'.");
    
    // Auth Check
    if (!isAuthenticated) {
      addLog("WARN", "Unauthorized pipeline block! Current user lacks a valid authenticated principal. HTTP 401 Returned.");
      return;
    }

    // Performance tracking simulation
    const startTime = performance.now();

    // 1. Database Routing Decision
    addLog("INFO", "Resolving connection factory via IDbConnectionFactory using IDatabaseRouter...");
    const isMatchedInReadMethods = readMethods.some(m => "SearchAsset".toLowerCase().includes(m.toLowerCase()));
    
    let targetDb = "";
    let activeConnString = "";
    if (isMatchedInReadMethods) {
      targetDb = "Read Replica Database";
      activeConnString = readConnString;
      addLog("SUCCESS", `[DATABASE ROUTER] 'SearchAsset' is registered in ReadMethods list inside configuration. ROUTING to secondary ${targetDb}!`);
    } else {
      targetDb = "Primary Write Database";
      activeConnString = writeConnString;
      addLog("WARN", `[DATABASE ROUTER] 'SearchAsset' was not registered in ReadMethods config. Falling back to active HTTP request type routing. GET routes to replica.`);
      addLog("SUCCESS", `[DATABASE ROUTER] Routed to ${targetDb}.`);
    }

    // 2. Encryption simulation
    const simulatedEncryptedString = btoa(activeConnString.substring(0, 30));
    addLog("INFO", `[SECURITY] Retrieved connection credentials securely. AES decrypted conn prefix: ${simulatedEncryptedString.substring(0, 10)}...`);

    // 3. Cache Check
    addLog("INFO", `Checking cache via ICacheProvider [Active Provider: ${cacheProvider}]...`);
    const cacheKey = `vms:assets:search:${simSearchTerm || "all"}:${simCriticality || "all"}`;
    const cacheHit = Math.random() > 0.6; // 40% chance of cache hit

    if (cacheHit) {
      addLog("SUCCESS", `[CACHE HIT] Located matching assets in ${cacheProvider} store for key: ${cacheKey}. Skipping SQL query execution.`);
    } else {
      addLog("INFO", `[CACHE MISS] Key '${cacheKey}' not found. Executing Dapper SP query against target SQL Server...`);
      addLog("INFO", `[SQL Server] Executing Stored Procedure: Asset.usp_SearchAsset @SearchTerm = '${simSearchTerm || "NULL"}', @Criticality = '${simCriticality || "NULL"}'`);
    }

    const filtered = simulatedAssets.filter(a => {
      const matchSearch = simSearchTerm ? (a.HostName.toLowerCase().includes(simSearchTerm.toLowerCase()) || a.IPAddress.includes(simSearchTerm)) : true;
      const matchCriticality = simCriticality ? a.Criticality.toLowerCase() === simCriticality.toLowerCase() : true;
      return matchSearch && matchCriticality;
    });

    const elapsed = Math.round((performance.now() - startTime) + (cacheHit ? 2 : 45));
    if (elapsed > 500) {
      addLog("WARN", `[PERFORMANCE SLA BREACHED] Query execution time: ${elapsed}ms exceeded corporate threshold of 500ms.`);
    } else {
      addLog("INFO", `API response dispatched. Elapsed time: ${elapsed}ms. HTTP Status 200 OK.`);
    }
  };

  // SIMULATOR ACTION: CREATE ASSET (EF CORE + DATABASE ROUTER + AUDIT TRAIL)
  const handleSimCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHostName || !newIPAddress) {
      addLog("WARN", "Validation Error: HostName and IPAddress are required!");
      return;
    }

    // Run custom validator rules
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipv4Regex.test(newIPAddress)) {
      addLog("WARN", "Validation Succeeded: False! CreateAssetValidator rule violation: IPAddress must be a valid IPv4 address.");
      return;
    }

    addLog("INFO", `Initiating POST /api/assets request [HostName: "${newHostName}", IPAddress: "${newIPAddress}"]`);
    addLog("INFO", "Executing RequestLoggingMiddleware: Incoming payload validated.");

    if (!isAuthenticated) {
      addLog("WARN", "Unauthorized write action blocked! Principal token not present. HTTP 401.");
      return;
    }

    // Database Routing for WRITE
    addLog("INFO", "[DATABASE ROUTER] Calculating destination node for HTTP POST write transaction...");
    addLog("SUCCESS", `[DATABASE ROUTER] Action is Write / state-changing. ROUTING connection to PRIMARY WRITE DATABASE: ${writeConnString.substring(0, 40)}...`);

    // EF Core check duplicate HostName
    addLog("INFO", "[EF CORE] Checking if HostName duplicate exists in DbContext...");
    const duplicate = simulatedAssets.some(a => a.HostName.toLowerCase() === newHostName.toLowerCase());
    if (duplicate) {
      addLog("WARN", `[EF CORE] Unique constraint breach. Asset with hostname '${newHostName}' already exists. Transaction aborted!`);
      return;
    }

    // Save entity
    const newAssetId = crypto.randomUUID();
    const createdAsset: SimulatedAsset = {
      AssetID: newAssetId,
      HostName: newHostName,
      IPAddress: newIPAddress,
      OperatingSystem: newOS,
      Criticality: newCriticality,
      CreatedBy: simUser,
      CreatedAt: new Date().toISOString()
    };

    setSimulatedAssets(prev => [createdAsset, ...prev]);
    addLog("SUCCESS", `[EF CORE] New record tracked in AssetDbContext state tracking. Transaction Committed successfully.`);

    // Audit Log Integration
    const details = `Created host ${newHostName} with IP ${newIPAddress} and criticality ${newCriticality}`;
    const auditEntry = {
      action: "CreateAsset",
      type: "Asset",
      id: newAssetId,
      details: details,
      user: simUser,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [auditEntry, ...prev]);
    addLog("AUDIT", `[AUDIT TRAIL] Event written to database. User: ${simUser} | Action: CreateAsset | TargetID: ${newAssetId}`);

    // Flush cache since data modified
    addLog("INFO", `[CACHE PURGE] Data modified. Flashing all cache keys matching wildcard pattern 'vms:assets:*' inside ${cacheProvider} store.`);

    // Clear inputs
    setNewHostName("");
    setNewIPAddress("");
  };

  // Helper to render file tree recursively
  const renderTree = (node: any, depth = 0) => {
    return Object.keys(node).sort((a, b) => {
      // Sort folders first, then files
      const nodeA = node[a];
      const nodeB = node[b];
      if (nodeA._isFile !== nodeB._isFile) {
        return nodeA._isFile ? 1 : -1;
      }
      return a.localeCompare(b);
    }).map((key) => {
      const value = node[key];
      const isExpanded = expandedFolders[value._fullPath];
      const hasChildren = Object.keys(value.children).length > 0;

      if (value._isFile) {
        const isSelected = selectedFileId === value._fileId;
        return (
          <button
            key={value._fullPath}
            onClick={() => setSelectedFileId(value._fileId)}
            className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-xs font-mono transition-colors text-left ${
              isSelected 
                ? "bg-slate-700 text-teal-300 border-l-2 border-teal-400 font-medium" 
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
            style={{ paddingLeft: `${(depth + 1) * 12}px` }}
          >
            <FileCode size={14} className={isSelected ? "text-teal-400" : "text-slate-400"} />
            <span className="truncate">{key}</span>
          </button>
        );
      } else {
        return (
          <div key={value._fullPath}>
            <button
              onClick={() => toggleFolder(value._fullPath)}
              className="w-full flex items-center gap-1.5 py-1.5 px-2 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors text-left"
              style={{ paddingLeft: `${depth * 12}px` }}
            >
              {isExpanded ? <FolderOpen size={14} className="text-amber-400" /> : <Folder size={14} className="text-amber-400" />}
              <span className="font-sans text-slate-300 truncate">{key}</span>
            </button>
            {isExpanded && hasChildren && (
              <div className="border-l border-slate-800 ml-3.5 pl-0.5">
                {renderTree(value.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }
    });
  };

  // Simple category filtering
  const filteredFilesList = useMemo(() => {
    if (!searchTerm) return files;
    return files.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [files, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-br from-teal-400 to-indigo-500 text-slate-950 text-xs font-bold font-mono py-1 px-2.5 rounded-md tracking-wider">
              .NET 10
            </span>
            <h1 className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              VMS Enterprise Skeleton Hub & Architect Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            A production-ready POC showcasing database routing, dual connections, caching abstraction factories, and vertical slice Modular Monolith handlers for a commercial Vulnerability Management System.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportFullSolution}
            disabled={isExporting}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-teal-500/10 transition-all cursor-pointer font-sans"
          >
            {isExporting ? <RefreshCw className="animate-spin" size={14} /> : <Download size={14} />}
            <span>Export Full Solution (.zip)</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE AREA */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-140px)]">
        
        {/* LEFT COLUMN: FILE EXPLORER (300px) */}
        <aside className="w-full lg:w-76 border-r border-slate-800 bg-slate-900/40 p-4 flex flex-col gap-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-teal-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Solution Explorer</h2>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
              62 Files
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 text-slate-500" size={13} />
            <input
              type="text"
              placeholder="Search code & path..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          {/* Explorer Tree */}
          <div className="flex-1 overflow-y-auto max-h-[380px] lg:max-h-[620px] pr-1">
            {searchTerm ? (
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase px-2">Matches</p>
                {filteredFilesList.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFileId(f.id)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-xs font-mono transition-colors text-left ${
                      selectedFileId === f.id 
                        ? "bg-slate-800 text-teal-300 font-medium" 
                        : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode size={13} className="text-teal-400 shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 shrink-0 capitalize">{f.category}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1 select-none">
                {renderTree(fileTreeStructure)}
              </div>
            )}
          </div>

          <div className="border-t border-slate-800 pt-3">
            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <ShieldCheck size={14} className="text-teal-400" />
                <span>Modular Monolith POC</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Visual Studio solutions ready for clean expansion. Features optimized SP invocation and robust abstraction pipelines.
              </p>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: WORKSPACE CORE (TABS & VIEWER) */}
        <main className="flex-1 flex flex-col min-w-0 border-r border-slate-800 bg-slate-900/10">
          
          {/* Workspace Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/60 p-1.5 gap-1">
            <button
              onClick={() => setActiveWorkspaceTab("simulator")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeWorkspaceTab === "simulator"
                  ? "bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/30 text-teal-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu size={14} className={activeWorkspaceTab === "simulator" ? "text-teal-400" : ""} />
              <span>Architectural API Simulator</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("editor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeWorkspaceTab === "editor"
                  ? "bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/30 text-teal-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileCode size={14} className={activeWorkspaceTab === "editor" ? "text-teal-400" : ""} />
              <span>Code Explorer ({activeFile.name})</span>
            </button>
          </div>

          {/* TAB 1: CODE EDITOR PANEL */}
          {activeWorkspaceTab === "editor" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono select-none">{activeFile.path}</span>
                  {isEditing && (
                    <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-yellow-500/30">
                      Unsaved Changes
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(activeFile.content, activeFile.id)}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono py-1 px-2.5 rounded transition-all cursor-pointer"
                  >
                    {copiedId === activeFile.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedId === activeFile.id ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadFile(activeFile)}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono py-1 px-2.5 rounded transition-all cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </button>
                  {isEditing ? (
                    <button
                      onClick={handleSaveChanges}
                      className="flex items-center gap-1 bg-teal-500 hover:bg-teal-400 text-slate-950 text-[11px] font-bold py-1 px-2.5 rounded transition-all cursor-pointer"
                    >
                      <Save size={12} />
                      <span>Save Changes</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditedContent(activeFile.content);
                      }}
                      className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono py-1 px-2.5 rounded transition-all cursor-pointer"
                    >
                      <Edit size={12} />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Editor/Viewer body */}
              <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300 focus:outline-none">
                {isEditing ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-full bg-transparent text-slate-300 border-none resize-none focus:outline-none font-mono text-xs leading-relaxed"
                    spellCheck="false"
                  />
                ) : (
                  <pre className="relative overflow-visible">
                    <code>
                      {activeFile.content.split("\n").map((line, idx) => (
                        <div key={idx} className="flex hover:bg-slate-900/40">
                          <span className="w-8 select-none text-slate-600 text-right pr-3 shrink-0">{idx + 1}</span>
                          <span className="whitespace-pre-wrap">{line || " "}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE ARCHITECT API SIMULATOR */}
          {activeWorkspaceTab === "simulator" && (
            <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
              
              {/* Simulation Banner */}
              <div className="bg-gradient-to-r from-teal-950/40 via-indigo-950/30 to-slate-950/50 rounded-xl p-5 border border-teal-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-inner">
                <div>
                  <h3 className="text-sm font-semibold text-teal-300 flex items-center gap-1.5">
                    <Zap size={14} className="text-teal-400" />
                    Live System & Database Routing Simulator
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    See exactly how connection strings, memory cache hits/misses, authentication rules, and background tasks are orchestrated based on your current settings.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono text-slate-400">Environment Node: Active</span>
                </div>
              </div>

              {/* Endpoint Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Search Endpoint (READ ACTION) */}
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 hover:border-slate-800 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                        GET
                      </span>
                      <span className="text-xs font-mono text-slate-300 ml-2">/api/assets</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Dapper Search</span>
                  </div>
                  
                  <h4 className="text-xs font-bold text-white mt-3 uppercase tracking-wider">Search Assets (Reads)</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Triggers the Dapper stored procedure pipeline. Demonstrates cache validation and Read replica routing.
                  </p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-mono mb-1">Search term (Host/IP)</label>
                      <input
                        type="text"
                        placeholder="e.g. vms-prod"
                        value={simSearchTerm}
                        onChange={(e) => setSimSearchTerm(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-teal-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-mono mb-1">Criticality filter</label>
                      <select
                        value={simCriticality}
                        onChange={(e) => setSimCriticality(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                      >
                        <option value="">All levels</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSimSearch}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2 px-4 rounded-md text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play size={12} />
                      <span>Execute GET Search Request</span>
                    </button>
                  </div>
                </div>

                {/* Create Endpoint (WRITE ACTION) */}
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 hover:border-slate-800 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                        POST
                      </span>
                      <span className="text-xs font-mono text-slate-300 ml-2">/api/assets</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">EF Core Save</span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-3 uppercase tracking-wider">Create Asset (Writes)</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Triggers Entity Framework asset insertion. Demonstrates routing to write primary database, constraints checking, and audit trails.
                  </p>

                  <form onSubmit={handleSimCreate} className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-mono mb-1">HostName</label>
                        <input
                          type="text"
                          placeholder="vms-api-05"
                          value={newHostName}
                          onChange={(e) => setNewHostName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 px-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-mono mb-1">IP Address</label>
                        <input
                          type="text"
                          placeholder="10.100.1.18"
                          value={newIPAddress}
                          onChange={(e) => setNewIPAddress(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 px-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-mono mb-1">Operating System</label>
                        <input
                          type="text"
                          value={newOS}
                          onChange={(e) => setNewOS(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 px-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-mono mb-1">Criticality</label>
                        <select
                          value={newCriticality}
                          onChange={(e) => setNewCriticality(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 px-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold py-2 px-4 rounded-md text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play size={12} />
                      <span>Execute POST Create Request</span>
                    </button>
                  </form>
                </div>

              </div>

              {/* Simulated Data Store and Audits */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Active Simulated Assets View */}
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex flex-col h-[320px]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Database size={15} className="text-teal-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Assets Db State ({simulatedAssets.length})</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Schema: Asset.Asset</span>
                  </div>

                  <div className="flex-1 overflow-auto border border-slate-800/80 rounded-lg">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2 px-3 font-mono">HostName</th>
                          <th className="py-2 px-3 font-mono">IP Address</th>
                          <th className="py-2 px-3 font-mono">Criticality</th>
                          <th className="py-2 px-3 font-mono">Created By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 bg-slate-950/40 font-mono">
                        {simulatedAssets.map(a => (
                          <tr key={a.AssetID} className="hover:bg-slate-900/60 transition-colors">
                            <td className="py-2 px-3 text-white font-medium">{a.HostName}</td>
                            <td className="py-2 px-3 text-slate-300">{a.IPAddress}</td>
                            <td className="py-2 px-3">
                              <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-semibold border ${
                                a.Criticality === "Critical" 
                                  ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                                  : a.Criticality === "High"
                                  ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                                  : a.Criticality === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              }`}>
                                {a.Criticality}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-slate-400">{a.CreatedBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Audit Provider Trails Log */}
                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex flex-col h-[320px]">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={15} className="text-teal-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">IAuditProvider Security Trail Logs</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Class: DbAuditProvider</span>
                  </div>

                  <div className="flex-1 overflow-auto border border-slate-800/80 rounded-lg p-3 bg-slate-950 font-mono text-[11px] leading-relaxed space-y-2 text-slate-300">
                    {auditLogs.map((log, index) => (
                      <div key={index} className="border-b border-slate-900/80 pb-2 last:border-0">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                          <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                          <span>User: <strong className="text-teal-400">{log.user}</strong></span>
                        </div>
                        <div>
                          <span className="bg-slate-800 text-[10px] text-slate-300 py-0.5 px-1.5 rounded mr-1.5">{log.action}</span>
                          <span className="text-slate-300">{log.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* BOTTOM TERMINAL: SERILOG LOG CONSOLE */}
          <footer className="border-t border-slate-800 bg-slate-950 flex flex-col h-48 select-none shrink-0">
            <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-semibold text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-teal-400" />
                <span>Serilog Trace Console Stream (Standard Out)</span>
              </div>
              <button
                onClick={() => setSimulationLogs([])}
                className="hover:text-white transition-colors cursor-pointer text-[10px] font-sans font-normal"
              >
                Clear Console
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed space-y-1.5 bg-slate-950 text-slate-300">
              {simulationLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-600 italic">
                  Console stream empty. Execute request operations to populate logs.
                </div>
              ) : (
                simulationLogs.map((log, index) => (
                  <div key={index} className="flex gap-2.5 items-start">
                    <span className="text-slate-600 shrink-0">{log.timestamp}</span>
                    <span className={`shrink-0 font-semibold ${
                      log.level === "SUCCESS" 
                        ? "text-emerald-400" 
                        : log.level === "WARN" 
                        ? "text-yellow-400" 
                        : log.level === "AUDIT"
                        ? "text-purple-400"
                        : "text-blue-400"
                    }`}>
                      [{log.level}]
                    </span>
                    <span className="text-slate-300 break-all">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </footer>

        </main>

        {/* RIGHT COLUMN: PROVIDER ENGINE CONTROL PANEL (350px) */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 border-slate-800 bg-slate-900/20 p-5 flex flex-col gap-5 flex-shrink-0">
          
          <div className="flex items-center gap-2">
            <Settings size={15} className="text-teal-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Provider Infrastructure Options</h2>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed -mt-1">
            Toggle settings to refactor your providers. Re-compile and re-inject services in-memory instantly to see behavioral changes in the simulator.
          </p>

          <div className="space-y-4">
            
            {/* Cache Provider */}
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Cpu size={13} className="text-amber-400" />
                  Caching Engine
                </span>
                <span className="text-[9px] font-mono bg-slate-800 text-slate-400 py-0.5 px-1.5 rounded uppercase">{cacheProvider}</span>
              </label>
              
              <div className="grid grid-cols-2 gap-1.5">
                {["Memory", "Redis"].map(prov => (
                  <button
                    key={prov}
                    onClick={() => {
                      setCacheProvider(prov);
                      addLog("INFO", `Configured cache provider changed to: ${prov}. App settings synchronized.`);
                    }}
                    className={`py-1.5 px-2 rounded text-xs font-mono border transition-all cursor-pointer ${
                      cacheProvider === prov
                        ? "bg-amber-400/10 text-amber-300 border-amber-500/30 font-semibold"
                        : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Authentication Provider */}
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-teal-400" />
                  Identity Provider
                </span>
                <span className="text-[9px] font-mono bg-slate-800 text-slate-400 py-0.5 px-1.5 rounded uppercase">{authProvider}</span>
              </label>

              <div className="grid grid-cols-2 gap-1.5">
                {["JWT", "LDAP"].map(prov => (
                  <button
                    key={prov}
                    onClick={() => {
                      setAuthProvider(prov);
                      setIsAuthenticated(false); // require re-login
                      addLog("INFO", `Switched authentication scheme to ${prov}. Re-authorization required in simulator.`);
                    }}
                    className={`py-1.5 px-2 rounded text-xs font-mono border transition-all cursor-pointer ${
                      authProvider === prov
                        ? "bg-teal-400/10 text-teal-300 border-teal-500/30 font-semibold"
                        : "bg-slate-950 text-slate-400 border-slate-900 hover:text-white"
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>

              {/* Login Simulator Area */}
              <form onSubmit={handleSimAuthenticate} className="mt-3 bg-slate-950 rounded p-2.5 border border-slate-900 text-[11px] space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400 font-semibold">User Principal Auth</span>
                  <span className={`inline-block w-2 h-2 rounded-full ${isAuthenticated ? "bg-emerald-500" : "bg-red-500"}`} />
                </div>
                
                {authProvider === "JWT" ? (
                  <div className="text-[9px] text-slate-500 mb-1 leading-snug">
                    Default admin Account: <br />
                    Username: <strong className="text-slate-300">admin</strong> | Password: <strong className="text-slate-300">P@ssword123</strong>
                  </div>
                ) : (
                  <div className="text-[9px] text-slate-500 mb-1 leading-snug">
                    Default LDAP Account: <br />
                    Username: <strong className="text-slate-300">auditor@vms.local</strong> | Password: <strong className="text-slate-300">LdapSecure123</strong>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    placeholder="User name"
                    value={simUser}
                    onChange={(e) => setSimUser(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] focus:outline-none focus:border-teal-500 font-mono text-slate-300"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={simPassword}
                    onChange={(e) => setSimPassword(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] focus:outline-none focus:border-teal-500 font-mono text-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-teal-400 font-semibold py-1 rounded border border-teal-500/10 cursor-pointer"
                >
                  Authorize Principal
                </button>
              </form>
            </div>

            {/* Database Router Settings */}
            <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Database size={13} className="text-indigo-400" />
                  Database Router
                </label>
                <span className="text-[9px] font-mono text-slate-500">Read Replica Config</span>
              </div>

              {/* ReadMethods list custom tag editor */}
              <div>
                <label className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">ReadMethods List</label>
                <div className="flex flex-wrap gap-1 mb-2 bg-slate-950 p-2 rounded border border-slate-900 min-h-[50px]">
                  {readMethods.map(m => (
                    <span key={m} className="inline-flex items-center gap-1 bg-slate-900 text-teal-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800">
                      <span>{m}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setReadMethods(prev => prev.filter(x => x !== m));
                          addLog("INFO", `Removed '${m}' from Database ReadMethods. Router updated.`);
                        }}
                        className="text-slate-500 hover:text-red-400 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {readMethods.length === 0 && <span className="text-[10px] text-slate-600 italic">No methods - default routes only</span>}
                </div>

                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Add method (e.g. SearchAsset)"
                    id="newMethodInput"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = e.currentTarget;
                        if (input.value && !readMethods.includes(input.value)) {
                          setReadMethods(prev => [...prev, input.value]);
                          addLog("INFO", `Added '${input.value}' to Database ReadMethods router config.`);
                          input.value = "";
                        }
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("newMethodInput") as HTMLInputElement;
                      if (input && input.value && !readMethods.includes(input.value)) {
                        setReadMethods(prev => [...prev, input.value]);
                        addLog("INFO", `Added '${input.value}' to Database ReadMethods router config.`);
                        input.value = "";
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded text-xs transition-all cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Config documentation link/tip */}
            <div className="bg-gradient-to-br from-indigo-950/20 to-teal-950/10 p-4 rounded-xl border border-slate-800/40 text-xs text-slate-400 space-y-2 leading-relaxed">
              <div className="flex items-center gap-1 text-teal-400 font-bold">
                <BookOpen size={14} />
                <span>Architecture Tip</span>
              </div>
              <p>
                This POC uses **Manual Dependency Injection Mapping** in <code className="text-[10px] text-slate-300 font-mono">Program.cs</code> rather than massive reflection/scanners, keeping build execution fast and completely compliant with native Ahead-Of-Time (AOT) compiler rules in net10.
              </p>
            </div>

          </div>

        </aside>

      </div>
      
    </div>
  );
}
