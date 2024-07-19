const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { basename, join, resolve } = require('path');
const { sync } = require('glob');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apps/lifeperformance/backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      additionalEntryPoints: getEntryPoints(),
      generatePackageJson: true,
    }),
  ],
};

function getEntryPoints() {
  const entityFiles = sync(
    resolve(
      __dirname,
      '../../../libs/shared/backend/{users,users-roles,roles,roles-permissions,permissions,media,services,events,bookings}/data-access/**/*.entity.ts'
    )
  );

  const entities = entityFiles.reduce((acc, filename) => {
    const entryName = `entities/${basename(filename, '.entity.ts')}`;
    acc.push({
      entryName: entryName,
      entryPath: filename,
    });
    return acc;
  }, []);

  const migrationFiles = sync(resolve('./src/migrations/*.ts'));

  const migrations = migrationFiles.reduce((acc, filename) => {
    const migrationName = `migrations/${basename(filename, '.entity.ts')}`;
    acc.push({
      entryName: migrationName,
      entryPath: filename,
    });
    return acc;
  }, []);

  return [...entities, ...migrations];
}
