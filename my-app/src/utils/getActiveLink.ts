import { matchPath } from 'react-router';

export function getActiveLink(path: string, pathname: string) {
  return path ? !!matchPath({ path: path, end: false }, pathname) : false;
}
