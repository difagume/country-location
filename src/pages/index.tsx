// import { Inter } from 'next/font/google'
import geoip from 'doc999tor-fast-geoip'
import type { GetServerSidePropsContext } from 'next/types'

// const inter = Inter({ subsets: ['latin'] })

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
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='flex flex-col text-center'>
				<h2 className={'mb-3 text-2xl font-semibold'}>
					Country location <span className='inline-block'>-&gt;</span>
				</h2>
				{country ? (
					<div className='flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300'>
						{Object.values(country).map((data) => (
							<code key={data}>{data}</code>
						))}
					</div>
				) : (
					<p>---</p>
				)}
			</div>
		</main>
	)
}
