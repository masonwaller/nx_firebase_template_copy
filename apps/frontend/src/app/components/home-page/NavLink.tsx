// import Link from 'next/link'

export function NavLink({ href, children }:any) {
  return (
    <a
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </a>
  )
}
