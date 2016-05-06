function snake(str) {
  return str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
}

function getMods(mods) {
  return Object.keys(mods)
    .filter(mod => (mods[mod] !== undefined && mods[mod] !== null))
    .map(mod => `${snake(mod)}_${mods[mod]}`);
}

function getMixes(mixes) {
  return mixes
    .filter(mix => mix)
    .map(mix => ` ${mix}`)
    .join('');
}

function getArgs(args) {
  const out = {};
  args.forEach(arg => {
    if (typeof arg === 'string') {
      out.element = arg;
      return;
    }
    if (Array.isArray(arg)) {
      out.mixes = getMixes(arg);
      return;
    }
    if (typeof arg === 'object') {
      out.mods = getMods(arg);
      return;
    }
  });
  return out;
}

function bem(block = '') {
  return function cn(...args) {
    const { element = '', mixes = [], mods = [] } = getArgs(args);
    const namespace = element === '' ? block : (`${block}__${element}`);
    return mods.reduce((sum, mod) =>
      `${sum} ${namespace}_${mod}`, namespace).concat(mixes);
  };
}

function cssm(styles = {}) {
  return function cn(...args) {
    const { element = 'root', mixes = [], mods = [] } = getArgs(args);
    const namespace = styles[element] || '';
    return mods.reduce((sum, mod) => {
      const className = `${element}_${mod}`;
      if (sum === '') {
        return styles[className];
      }
      return `${sum} ${styles[className]}`;
    }, namespace).concat(mixes);
  };
}

module.exports = function catnip(initializer) {
  if (typeof initializer === 'object') {
    return cssm(initializer);
  }
  return bem(initializer);
};
