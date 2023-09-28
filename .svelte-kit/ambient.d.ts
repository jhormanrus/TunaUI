
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const NUGET_XMLDOC_MODE: string;
	export const COLORTERM: string;
	export const CLOUDENV_ENVIRONMENT_ID: string;
	export const NVM_INC: string;
	export const TERM_PROGRAM_VERSION: string;
	export const GITHUB_USER: string;
	export const rvm_prefix: string;
	export const CODESPACE_NAME: string;
	export const HOSTNAME: string;
	export const NODE: string;
	export const JAVA_ROOT: string;
	export const JAVA_HOME: string;
	export const DOTNET_ROOT: string;
	export const CODESPACES: string;
	export const GRADLE_HOME: string;
	export const PYTHON_ROOT: string;
	export const NVS_DIR: string;
	export const NVS_OS: string;
	export const DOTNET_SKIP_FIRST_TIME_EXPERIENCE: string;
	export const MY_RUBY_HOME: string;
	export const npm_config_local_prefix: string;
	export const NVS_USE_XZ: string;
	export const SDKMAN_CANDIDATES_DIR: string;
	export const RUBY_VERSION: string;
	export const PWD: string;
	export const PIPX_BIN_DIR: string;
	export const rvm_version: string;
	export const ORYX_DIR: string;
	export const _: string;
	export const ContainerVersion: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const HUGO_ROOT: string;
	export const GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN: string;
	export const NPM_GLOBAL: string;
	export const HOME: string;
	export const GITHUB_API_URL: string;
	export const LANG: string;
	export const GITHUB_TOKEN: string;
	export const LS_COLORS: string;
	export const DYNAMIC_INSTALL_ROOT_DIR: string;
	export const NVM_SYMLINK_CURRENT: string;
	export const npm_package_version: string;
	export const PHP_PATH: string;
	export const DEBIAN_FLAVOR: string;
	export const GIT_ASKPASS: string;
	export const PHP_ROOT: string;
	export const ORYX_ENV_TYPE: string;
	export const HUGO_DIR: string;
	export const DOCKER_BUILDKIT: string;
	export const GOROOT: string;
	export const INTERNAL_VSCS_TARGET_URL: string;
	export const SHELL_LOGGED_IN: string;
	export const PYTHON_PATH: string;
	export const NVM_DIR: string;
	export const rvm_bin_path: string;
	export const GEM_PATH: string;
	export const GEM_HOME: string;
	export const GITHUB_CODESPACE_TOKEN: string;
	export const LESSCLOSE: string;
	export const NVS_ROOT: string;
	export const GITHUB_GRAPHQL_URL: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const LESSOPEN: string;
	export const USER: string;
	export const NODE_ROOT: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const PYTHONIOENCODING: string;
	export const GITHUB_SERVER_URL: string;
	export const PIPX_HOME: string;
	export const NVS_HOME: string;
	export const CONDA_SCRIPT: string;
	export const MAVEN_HOME: string;
	export const SDKMAN_DIR: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const ORYX_SDK_STORAGE_BASE_URL: string;
	export const GIT_EDITOR: string;
	export const CONDA_DIR: string;
	export const PROMPT_DIRTRIM: string;
	export const SDKMAN_CANDIDATES_API: string;
	export const ENABLE_DYNAMIC_INSTALL: string;
	export const MAVEN_ROOT: string;
	export const ORYX_PREFER_USER_INSTALLED_SDKS: string;
	export const npm_config_user_agent: string;
	export const JUPYTERLAB_PATH: string;
	export const npm_execpath: string;
	export const RVM_PATH: string;
	export const npm_package_json: string;
	export const BUN_INSTALL: string;
	export const GITHUB_REPOSITORY: string;
	export const RAILS_DEVELOPMENT_HOSTS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const RUBY_ROOT: string;
	export const RUBY_HOME: string;
	export const BROWSER: string;
	export const PATH: string;
	export const CODESPACE_VSCODE_FOLDER: string;
	export const SDKMAN_PLATFORM: string;
	export const NVM_BIN: string;
	export const IRBRC: string;
	export const npm_node_execpath: string;
	export const rvm_path: string;
	export const OLDPWD: string;
	export const GOPATH: string;
	export const TERM_PROGRAM: string;
	export const VSCODE_IPC_HOOK_CLI: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		NUGET_XMLDOC_MODE: string;
		COLORTERM: string;
		CLOUDENV_ENVIRONMENT_ID: string;
		NVM_INC: string;
		TERM_PROGRAM_VERSION: string;
		GITHUB_USER: string;
		rvm_prefix: string;
		CODESPACE_NAME: string;
		HOSTNAME: string;
		NODE: string;
		JAVA_ROOT: string;
		JAVA_HOME: string;
		DOTNET_ROOT: string;
		CODESPACES: string;
		GRADLE_HOME: string;
		PYTHON_ROOT: string;
		NVS_DIR: string;
		NVS_OS: string;
		DOTNET_SKIP_FIRST_TIME_EXPERIENCE: string;
		MY_RUBY_HOME: string;
		npm_config_local_prefix: string;
		NVS_USE_XZ: string;
		SDKMAN_CANDIDATES_DIR: string;
		RUBY_VERSION: string;
		PWD: string;
		PIPX_BIN_DIR: string;
		rvm_version: string;
		ORYX_DIR: string;
		_: string;
		ContainerVersion: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		HUGO_ROOT: string;
		GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN: string;
		NPM_GLOBAL: string;
		HOME: string;
		GITHUB_API_URL: string;
		LANG: string;
		GITHUB_TOKEN: string;
		LS_COLORS: string;
		DYNAMIC_INSTALL_ROOT_DIR: string;
		NVM_SYMLINK_CURRENT: string;
		npm_package_version: string;
		PHP_PATH: string;
		DEBIAN_FLAVOR: string;
		GIT_ASKPASS: string;
		PHP_ROOT: string;
		ORYX_ENV_TYPE: string;
		HUGO_DIR: string;
		DOCKER_BUILDKIT: string;
		GOROOT: string;
		INTERNAL_VSCS_TARGET_URL: string;
		SHELL_LOGGED_IN: string;
		PYTHON_PATH: string;
		NVM_DIR: string;
		rvm_bin_path: string;
		GEM_PATH: string;
		GEM_HOME: string;
		GITHUB_CODESPACE_TOKEN: string;
		LESSCLOSE: string;
		NVS_ROOT: string;
		GITHUB_GRAPHQL_URL: string;
		TERM: string;
		npm_package_name: string;
		LESSOPEN: string;
		USER: string;
		NODE_ROOT: string;
		VSCODE_GIT_IPC_HANDLE: string;
		PYTHONIOENCODING: string;
		GITHUB_SERVER_URL: string;
		PIPX_HOME: string;
		NVS_HOME: string;
		CONDA_SCRIPT: string;
		MAVEN_HOME: string;
		SDKMAN_DIR: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		ORYX_SDK_STORAGE_BASE_URL: string;
		GIT_EDITOR: string;
		CONDA_DIR: string;
		PROMPT_DIRTRIM: string;
		SDKMAN_CANDIDATES_API: string;
		ENABLE_DYNAMIC_INSTALL: string;
		MAVEN_ROOT: string;
		ORYX_PREFER_USER_INSTALLED_SDKS: string;
		npm_config_user_agent: string;
		JUPYTERLAB_PATH: string;
		npm_execpath: string;
		RVM_PATH: string;
		npm_package_json: string;
		BUN_INSTALL: string;
		GITHUB_REPOSITORY: string;
		RAILS_DEVELOPMENT_HOSTS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		RUBY_ROOT: string;
		RUBY_HOME: string;
		BROWSER: string;
		PATH: string;
		CODESPACE_VSCODE_FOLDER: string;
		SDKMAN_PLATFORM: string;
		NVM_BIN: string;
		IRBRC: string;
		npm_node_execpath: string;
		rvm_path: string;
		OLDPWD: string;
		GOPATH: string;
		TERM_PROGRAM: string;
		VSCODE_IPC_HOOK_CLI: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
