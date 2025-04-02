import React from "react"
import { languajePage } from "src/stores/languajePage"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { generalConfig } from "@util/generalConfig"
import { useStore } from "@nanostores/react"
export const FormSelectLanguage = () => {
  const { data} = useStore(languajePage)
    const formik = useFormik({
        initialValues: {
          language: generalConfig.idioma,
        },
        validationSchema: Yup.object({
          language: Yup.string().required('Selecciona un idioma'),
        }),
        onSubmit: (values) => {
          languajePage.set({ data: {languajeChoose: values.language}, loading: false, error: null })
        },
      })
    return (
        <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
                <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
                Selecciona un idioma
                </label>
                <select
                id="language"
                name="language"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.language}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                <option value="">Selecciona...</option>
                <option value="/en/">English </option>
                <option value="/es/">Español</option>
                <option value="/pt/">Portugues</option>
                <option value="/fr/">Francés</option>
                </select>
                {formik.touched.language && formik.errors.language ? (
                <div className="text-red-500 text-xs italic">{formik.errors.language}</div>
                ) : null}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Cambiar Idioma
            </button>
        </form>
    )    
}

