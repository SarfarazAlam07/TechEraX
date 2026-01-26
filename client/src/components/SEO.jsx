import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, url }) => {
  const siteName = "TechEraX";
  const defaultDescription =
    "TechEraX is a leading software development company in Patna, Bihar offering Web Development, App Development, and UI/UX Design services.";
  const defaultKeywords =
    "Best Website Company in Bihar, App Development company in Bihar, Techerax , techerax,founder of techerax, Sarfaraz techereax, Asif Techerax, zugnu Techerax, sahil techerax , Dheraj techerax, Website banane wala, School Management Software, Coaching App Developer, Online Kirana Dukan App, Restaurant Food Delivery App, Medical Store Billing Software, Real Estate Website Maker, News Portal Developer, NGO Website, Hotel Booking App, Salon Booking System, Gym Management Software, Travel Agency Website, Sasta Website Design Bihar, TechEraX";
  const siteUrl = "https://tech-era-x.vercel.app";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
    </Helmet>
  );
};

export default SEO;
