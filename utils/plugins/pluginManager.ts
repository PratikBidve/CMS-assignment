// plugins/pluginManager.ts

interface Plugin {
    name: string;
    components: Record<string, React.ComponentType<any>>; // Custom content blocks
    initialize?: () => void; // Optional initialization function
  }
  
  // Store all registered plugins
  const registeredPlugins: Plugin[] = [];
  
  // Register a plugin
  export const registerPlugin = (plugin: Plugin) => {
    registeredPlugins.push(plugin);
    if (plugin.initialize) {
      plugin.initialize(); // Run plugin's initialization if provided
    }
  };
  
  // Get registered plugins
  export const getRegisteredPlugins = () => registeredPlugins;
  