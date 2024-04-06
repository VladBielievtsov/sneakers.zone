import Link from 'next/link'

export default function Logo() {
  return (
    <Link href={"/sneakers"} className="text-2xl">
      <span className="text-xl">Sneakers.zone</span>
    </Link>
  )
}
