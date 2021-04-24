import cxs from 'cxs';

export function reset(): void {
  cxs.reset();
}

export function render(): string {
  return cxs.css();
}
