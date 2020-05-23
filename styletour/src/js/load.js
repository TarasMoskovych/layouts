const requireAll = r => r.keys().forEach(r);
requireAll(require.context('../img/', false, /\.(png|jpg)$/));
