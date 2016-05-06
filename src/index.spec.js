const expect = require('chai').expect;

const catnip = require('../lib/index.js');

const styles = {
  root: 'block__root',
  'root_mod-name_mod-value': 'block__root_mod-name_mod-value',
  'root_another-mod_another-value': 'block__root_another-mod_another-value',
  element: 'block__element',
  element_mod_false: 'block__element_mod_false',
  'element-no-base_mod-name_mod-value': 'block__element-no-base_mod-name_mod-value',
  'element_mod-name_mod-value': 'block__element_mod-name_mod-value',
  'element_another-mod_another-value': 'block__element_another-mod_another-value',
};

function common(cn) {
  it('cn is function', () => {
    expect(typeof cn).to.equal('function');
  });
  it('cn returns block__element on call with element', () => {
    expect(cn('element')).to.equal('block__element');
  });
  it('cn returns block__element block__element_modName_modValue on call with element and mods',
    () => {
      expect(cn('element', { modName: 'mod-value', anotherMod: 'another-value' })).to.equal(
      'block__element block__element_mod-name_mod-value block__element_another-mod_another-value');
    });
  it('cn skips undefined mods but not false', () => {
    expect(cn('element', { mod: undefined })).to.equal('block__element');
    expect(cn('element', { mod: null })).to.equal('block__element');
    expect(cn('element', { mod: false })).to.equal('block__element block__element_mod_false');
  });
  it('cn mixes array in arguments into class name', () => {
    expect(cn('element', ['mixed', 'more'])).to.equal('block__element mixed more');
  });
  it('cn skips not truthy mixes', () => {
    expect(cn('element', [''])).to.equal('block__element');
    expect(cn('element', [undefined])).to.equal('block__element');
    expect(cn('element', [null])).to.equal('block__element');
    expect(cn('element', [false])).to.equal('block__element');
  });
}

describe('BEM', () => {
  it('cn default block is empty string', () => {
    const cn = catnip();
    expect(cn()).to.equal('');
  });
  it('cn returns block on call', () => {
    const cn = catnip('block');
    expect(cn()).to.equal('block');
  });
  it('cn returns block block_modName_modValue on call without element and with mods', () => {
    const cn = catnip('block');
    expect(cn({ modName: 'mod-value', anotherMod: 'another-value' })).to.equal(
      'block block_mod-name_mod-value block_another-mod_another-value');
  });
  common(catnip('block'));
});

describe('CSS Modules', () => {
  const cn = catnip(styles);
  it('cn default element is root', () => {
    expect(cn()).to.equal('block__root');
  });
  it('cn returns root root_modName_modValue on call without element and with mods', () => {
    expect(cn({ modName: 'mod-value', anotherMod: 'another-value' })).to.equal(
      'block__root block__root_mod-name_mod-value block__root_another-mod_another-value');
  });
  it('cn skips element if it is undefinded', () => {
    expect(cn('element-no-base', { modName: 'mod-value' })).to.equal(
      'block__element-no-base_mod-name_mod-value');
  });
  common(catnip(styles));
});
