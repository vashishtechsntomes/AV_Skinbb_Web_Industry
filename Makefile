# Makefile for React + Vite + TypeScript + ESLint + Prettier + Tailwind

# Install dependencies
install:
	npm install

# Start development server
dev:
	npm run dev

# Build the project for production
build:
	rm -rf dist
	npm run build

# Preview production build
preview:
	npm run preview

# Type check using tsc
typecheck:
	npx tsc --noEmit

# Run ESLint on all relevant files
lint:
	npx eslint . --ext .js,.ts,.jsx,.tsx

# Automatically fix ESLint issues
lint-fix:
	npx eslint . --ext .js,.ts,.jsx,.tsx --fix

# Format code using Prettier
format:
	npx prettier . --write

# Check formatting (without writing changes)
format-check:
	npx prettier . --check

# Clean up node_modules and build artifacts
clean:
	rm -rf node_modules dist .vite .turbo .next

# Full reset and reinstall
reset: clean
	rm -rf package-lock.json
	make install

# Run all code quality checks (typecheck, lint, format check)
check:
	make typecheck
	make lint
	make format-check
	
# Start SonarQube server
sonar-start:
	cd ~/sonarqube/bin/linux-x86-64 && ./sonar.sh start

# Run SonarScanner analysis
sonar:
	sonar-scanner