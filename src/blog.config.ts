// Purpose: This file is used to configure the blog, including the author, title, description, and other settings.

// Page Config
// The following is the configuration of the blog, including the author, title, description, and other settings.
const blogConfig: any = {
    // author name
    author: "yunfan",

    // Logo
    logo: {
        // how to change the favicon of the website?
        // change the app/favicon.ico file directly，or refer to the document below
        // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

        // you can use image or text as the logo, you can choose both, but the image will be displayed first
        image: "/logo.png", //  the file path of the logo in the public directory
        text: "LetterGPT", // null || text

        // whether the logo is a link to the home page
        isHomeLink: true, // true | false
    },

    // website title
    title: "LetterGPT",

    // website description
    description: "个人博客 ",

    // light | dark
    theme: "light",

    // your blog repo || your github repo || null
    githubRepo: "https://github.com/imyuanli/next-blog",

    // routes
    routes: [
        {
            name: 'Projects',
            value: '/project'
        },
        {
            name: 'Blogs',
            value: '/blog'
        }

    ],

    // socials links
    socials: {
        email: "286547316@qq.com",
        github: "https://github.com/imyuanli",
        twitter: "https://twitter.com",
        linkedin: "",
        facebook: "",
        instagram: "",
        youtube: "",
    },

    // home page config
    home: {
        title: "Welcome to NextBlog",
        description: "A minimalist blog created with Next.js ,Shadcn-ui and Tailwind.css",
    },

    // blog page config
    blog: {
        title: 'Changelog & Blogs',
        description: 'Regarding the update logs of NextBlog, blogs, and others, etc.',

        // pinnedSort is used to sort the pinned articles, the default is "desc" (descending), you can also set it to "asc" (ascending)
        pinnedSort: "desc", // "asc" | "desc"
    },

    // tags page config
    tags: {
        title: 'Tags',
        description: 'All of my tags, collected in alphabetical order.',
    },

    // project page config
    project: {
        title: "Look what I've done",
        description: "Some small tools made by oneself",

        // status color and text
        getStatus: (status: string) => {
            // you can customize the status color and text！

            // dev: Under development or planning.
            // active: Currently focused on this project.
            // filed: Not upgrading will only fix bugs.
            // offline: Going offline soon.
            // none: Keep running.
            if (!status) return {}

            switch (status) {
                case "active":
                    return {
                        variant: "default",
                        text: "ACTIVE",
                    }
                case "dev":
                    return {
                        variant: "secondary",
                        text: "DEV",
                    }
                case "filed":
                    return {
                        variant: "outline",
                        text: "FILED",
                    }
                case "offline":
                    return {
                        variant: "destructive",
                        text: "OFFLINE",
                    }
            }
        },

        // name, description, href are required
        // github: username/repo
        // status: getStatus return value
        // and so on
        // you can add more fields according to your needs ,but you need to modify the code in the project/page.tsx file
        projects: [
            {
                name: "Website",
                href: "https://next-blog.imyuanli.cn",
                github: "imyuanli/next-blog",
                status: "active",
            },
            {
                name: "SupportMail",
                status: "dev",
            },

        ],
    },

    // Footer
    footer: {
        isShow: true,
        // whether to display the "Powered by NextBlog" in the footer，you can set it to false，but I hope you can keep it，thank you！
        isShowPoweredBy: true,
    },
}

// Plugins Config
// Why define the following as plugins? Because these are some dispensable functions that can be added or removed at will.
const pluginConfig = {
    // Comment
    comment: {
        engine: "giscus", // "" | giscus | utterances

        // giscus doc: https://giscus.app
        giscus: {
            repo: "imyuanli/next-blog",
            repoId: "R_kgDOKTZ_kQ",
            category: "Announcements",
            categoryId: "DIC_kwDOKTZ_kc4CfMXK",
            mapping: "pathname",
            reactionsEnabled: "1",
            emitMetadata: "0",
            inputPosition: "top",
            theme: "light",
            lang: "en",
            loading: "lazy",
        },

        // utterances doc: https://utteranc.es
        utterances: {
            src: "https://utteranc.es/client.js",
            repo: "imyuanli/next-blog",
            "issue-term": "pathname",
            theme: "github-light",
            crossorigin: "anonymous",
            label: "",
            async: true
        }
    },

    // Pagination
    pagination: {
        engine: "default", // "" | default:pagination button | loadMore:loading more button
        pageSize: 5,
    },

    // Search
    search: {
        engine: "cmdk", //  "" | "cmdk"
    },

    //   Analytics
    analytics: {
        engine: "vercel", // "" | "vercel"
        // vercel doc: https://vercel.com/docs/analytics
    },

    // newsletter
    newsletter: {
        engine: "buttondown", // "" | "buttondown"

        title: "Subscribe to the newsletter", // required
        description: "Stay updated on new releases and features, guides, and case studies.",

        position: {
            footer: false, // in the footer
            blog: false, // on the blog list page
        },

        // buttondown doc: https://buttondown.com
        buttondown: {
            username: "yunfan", //  your buttondown username
        },
    },
}

export {
    blogConfig,
    pluginConfig
}