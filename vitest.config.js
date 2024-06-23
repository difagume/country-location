import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		compilerOptions: {
			types: ['vitest/jsdom']
		},
		reporters: ['junit'],
		outputFile: './test-results/junit-report.xml'
	}
})
