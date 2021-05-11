import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.resolve(process.cwd(), 'build')
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/**/*.css', to: 'css/[name].css' }]
    })
  ]
};
