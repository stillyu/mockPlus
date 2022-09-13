import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import { visualizer } from "rollup-plugin-visualizer";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    createStyleImportPlugin({
      resolves: [
        AntdResolve()
      ],
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/css`
          },
        }
      ]
    }),
    react(),
    copy({
      targets: [
        { src: "src/manifest.json", dest: "dist" },
        { src: "src/assets", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
    ...(!!process.env.ANALYZE ? [visualizer({ open: true })] : []),
  ],
  build: {
    rollupOptions: {
      input: ["index.html", "src/background.ts", "src/contentScript.ts"],
      output: {
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
        entryFileNames: "[name].js",
        dir: "dist",
      }
    },
  },
});