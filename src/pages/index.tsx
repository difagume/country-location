import { Inter } from 'next/font/google'
import geoip from 'doc999tor-fast-geoip'
import { GetServerSidePropsContext } from 'next/types'

const inter = Inter({ subsets: ['latin'] })

interface ipInfo {
	range: [number, number]
	country: string
	region: string
	eu: '0' | '1'
	timezone: string
	city: string
	ll: [number, number]
	metro: number
	area: number
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const ip = ctx.req.headers['x-real-ip'] || ctx.req.socket.remoteAddress
	// const country = await geoip.lookup('207.97.227.239')
	const country = await geoip.lookup(ip as string)

	return {
		props: {
			country
		}
	}
}

export default function Home({ country }: { country: ipInfo }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
				<h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
					Country location{' '}
					<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
						-&gt;
					</span>
				</h2>
				{country ? (
					Object.values(country).map((data) => (
						<p
							key={data}
							className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
						>
							{data}
						</p>
					))
				) : (
					<p>---</p>
				)}
			</div>
		</main>
	)
}
