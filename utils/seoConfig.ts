// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
	baseURL: "https://elparaisodemisabuelos.com", // Change this to your production URL.
	description:
		"Queremos dar la más cordial bienvenida a todos los visitantes del sitio, brindándoles un cálido recibimiento y una atención excepcional, para que puedan sumergirse en la belleza y tranquilidad de este lugar lleno de paz y naturaleza. Aquí, aquellos que nos visitan tienen la oportunidad de desconectar de la tecnología y el estrés de la ciudad, y en su lugar, disfrutar del canto de las aves, el murmullo del agua y la alegría que llena el alma al interactuar con los animales y la naturaleza.", // Change this to be your website's description.
	type: "website",
	image: {
		url: "https://picsum.photos/1200/630", // Change this to your website's thumbnail.
		alt: "Fotografía del paraiso de mis abuelos", // Change this to your website's thumbnail description.
		width: 1200,
		height: 630
	},
	siteName: "El paraiso de mis abuelos", // Change this to your website's name,
	twitter: {
		card: "Queremos dar la más cordial bienvenida a todos los visitantes del sitio, brindándoles un cálido recibimiento y una atención excepcional, para que puedan sumergirse en la belleza y tranquilidad de este lugar lleno de paz y naturaleza. Aquí, aquellos que nos visitan tienen la oportunidad de desconectar de la tecnología y el estrés de la ciudad, y en su lugar, disfrutar del canto de las aves, el murmullo del agua y la alegría que llena el alma al interactuar con los animales y la naturaleza."
	}
}

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
	name: "El paraiso de mis abuelos", // Change this to your website's name.
	short_name: "El paraiso", // Change this to your website's short name.
	description:
		"Queremos dar la más cordial bienvenida a todos los visitantes del sitio, brindándoles un cálido recibimiento y una atención excepcional, para que puedan sumergirse en la belleza y tranquilidad de este lugar lleno de paz y naturaleza. Aquí, aquellos que nos visitan tienen la oportunidad de desconectar de la tecnología y el estrés de la ciudad, y en su lugar, disfrutar del canto de las aves, el murmullo del agua y la alegría que llena el alma al interactuar con los animales y la naturaleza.", // Change this to your websites description.
	theme_color: "#30E130", // Change this to your primary color.
	background_color: "#ffffff", // Change this to your background color.
	display: "minimal-ui",
	icons: [
		{
			src: "/favicons/favicon-192x192.png",
			sizes: "192x192",
			type: "image/png"
		},
		{
			src: "/favicons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png"
		},
		{
			src: "/favicons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable"
		}
	]
}


export const generalConfig = {
	name: "El paraiso de mis abuelos",
	
}