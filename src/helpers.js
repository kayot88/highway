/**
 * @file Highway helper methods used all acrosse the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

// Dependencies
import Renderer from './renderer';

// Constants
const PARSER = new DOMParser();

// Highway Helpers
export default class Helpers {

  /**
   * Get origin of an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Origin of URL or `null`
   * @static
   */
  static getOrigin(url) {
    const match = url.match(/(https?:\/\/[\w\-.]+)/);
    return match ? match[1] : null;
  }

  /**
   * Get pathname of an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Pathname of URL or `null`
   * @static
   */
  static getPathname(url) {
    const match = url.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
    return match ? match[1] : null;
  }

  /**
   * Get anchor in an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Anchor in URL or `null`
   * @static
   */
  static getAnchor(url) {
    const match = url.match(/(#.*)$/);
    return match ? match[1] : null;
  }

  /**
   * Get search in URL.
   *
   * @arg    {string} url — URL to match
   * @return {object} Search in URL formatted as an object or `null`
   * @static
   */
  static getParams(url) {
    const match = url.match(/\?([\w_\-.=&]+)/);

    if (!match) {
      return null;
    }

    const search = match[1].split('&');
    const object = {};

    for (let i = 0; i < search.length; i++) {
      const part = search[i].split('=');
      const { 0: key } = part;
      const { 1: value } = part;

      object[key] = value;
    }

    return object;
  }

  /**
   * Get page's DOM from page HTML
   * 
   * @arg    {string} page — Page HTML
   * @return {string} Page DOM
   * @static
   */
  static getDOM(page) {
    return typeof page === 'string' ? PARSER.parseFromString(page, 'text/html') : page;
  }

  /**
   * Get view element from page DOM
   * 
   * @arg    {string} page — Page DOM
   * @return {object} View element or `null`
   * @static
   */
  static getView(page) {
    return page.querySelector('[router-view]');
  }

  /**
   * Get view's slug from view element
   * 
   * @arg    {string} view — [router-view] DOM
   * @return {string} Page slug or `null`
   * @static
   */
  static getSlug(view) {
    return view.getAttribute('router-view');
  }

  /**
   * Get page renderer
   *
   * @arg    {string} slug — Renderer's slug
   * @arg    {object} renderers — List of renderers
   * @return {object} Single renderer or default one
   * @static
   */
  static getRenderer(slug, renderers) {
    if (typeof renderers === 'undefined' || !renderers) {
      return Renderer;
    }
    return slug in renderers ? renderers[slug] : Renderer;
  }

  /**
   * Get page transition
   *
   * @arg    {string} slug — Transition slug
   * @arg    {object} transitions — List of transitions
   * @return {object} Single transition or `null`
   * @static
   */
  static getTransition(slug, transitions) {
    if (typeof transitions === 'undefined' || !transitions) {
      return null;
    }

    if (!(slug in transitions)) {
      if ('default' in transitions) {
        return transitions['default'];
      }
      return null;
    }

    return transitions[slug];
  }
}
