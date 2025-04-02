import React from "react"
import { languajePage } from "src/stores/languajePage"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { generalConfig } from "@util/generalConfig"
import { useStore } from "@nanostores/react"

export const FormSelectLanguage = () => {
    const { data: dataLanguaje} = useStore(languajePage)
    const formik = useFormik({
        initialValues: {
          language: generalConfig.idioma,
        },
        validationSchema: Yup.object({
          language: Yup.string().required(`
            ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.requiredSelect: "" }
            ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.requiredSelect: "" }
            ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.requiredSelect: "" }
            ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.requiredSelect: "" }`),
        }),
        onSubmit: (values) => {
          languajePage.set({ data: {languajeChoose: values.language}, loading: false, error: null })
        },
      })
    return (
      <div className="flex justify-center items-center mb-10">
      <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.selectLanguage : null }
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.selectLanguage: null }
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.selectLanguage: null }
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.selectLanguage: null }
                </label>
                <select
                id="language"
                name="language"
                onChange={(e) => {
                    formik.handleChange(e);
                    formik.handleSubmit();
                }}
                onBlur={formik.handleBlur}
                value={formik.values.language}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative"
                >
                <option value="">
            {dataLanguaje.languajeChoose === "/es/" ? generalConfig.GeneralWords.es.select:null }
            {dataLanguaje.languajeChoose === "/en/" ? generalConfig.GeneralWords.en.select:null }
            {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.GeneralWords.pt.select:null }
            {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.GeneralWords.fr.select:null }...</option>
                
                <option value="/es/">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.spanish: null }
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.spanish: null }
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.spanish: null }
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.spanish: null }</option>
                <option value="/en/">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.english: null }
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.english: null }
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.english: null }
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.english: null }</option>
                <option value="/pt/">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.portuguese: null }
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.portuguese: null }
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.portuguese: null }
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.portuguese: null }</option>
                <option value="/fr/">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.french: null }
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.french: null }
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.french: null }
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.french: null }</option>
                </select>
                {formik.touched.language && formik.errors.language ? (
                <div className="text-red-500 text-xs italic">{formik.errors.language}</div>
                ) : null}
            </div>
        </form>
        </div>
    )    
}
