import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Optimize deps
      babel: {
        plugins: [
          // Remove PropTypes in production
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@data': path.resolve(__dirname, './src/data'),
      '@animations': path.resolve(__dirname, './src/animations'),
      '@visualizations': path.resolve(__dirname, './src/visualizations'),
    },
  },
  build: {
    // Target modern browsers for better performance
    target: 'es2015',
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Optimize chunks
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Animation libraries
          'animation-vendor': ['framer-motion'],
          
          // Visualizations (heavy components)
          'visualizations': [
            './src/visualizations/NeuralNetworkViz.jsx',
            './src/visualizations/AttentionHeatmap.jsx',
            './src/visualizations/EmbeddingSpace.jsx',
            './src/visualizations/TokenFlow.jsx',
            './src/visualizations/TextGeneration.jsx',
          ],
        },
        
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
      },
    },
    
    // Source maps for production debugging (disable for smaller bundle)
    sourcemap: false,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000, // 1MB warning threshold
    
    // Report compressed size
    reportCompressedSize: true,
  },
  
  // Performance optimizations
  optimizeDeps: {
    // Pre-bundle dependencies
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    
    // Exclude large dependencies that should be loaded on demand
    exclude: [],
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    
    // Enable compression
    compress: true,
  },
  
  // Preview server configuration
  preview: {
    port: 3000,
    strictPort: false,
    open: true,
  },
})
