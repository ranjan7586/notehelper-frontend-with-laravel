import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "Notehelper app - download note now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Ranjan Jana"
};

export default Layout
