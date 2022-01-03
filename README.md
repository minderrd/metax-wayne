# metax-wayne

## Public URL
[https://d1073yf0ptkwai.cloudfront.net](https://d1073yf0ptkwai.cloudfront.net)

This project is developed using AWS Amplify and Nuxt.js. Here are the documents
[Amplify](https://docs.amplify.aws/start/q/integration/js/)
[Nuxt.js](https://nuxtjs.org/)

## For API Testing

You can import `MetaX Wayne.postman_collection.json` to `Postman` for API testing.

## Before Starting

Here are the requirements for developing this project
[Node.js >= 12](https://nodejs.org/en/download/)
[Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
[AWS CLI](https://aws.amazon.com/cli/?nc1=h_ls)
[Amplify](https://docs.amplify.aws/cli/start/install/)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Update Amplify Confuration

### Authentication

You can update Auth configuration by type `amplify update auth` and follow the
step-by-step instructions. After update

### Deploy

For publishing to production, please run the following command

``` bash
# update config
$ amplify push

# publish to production
$ amplify publish

```

## CloudFront Cache Issue

Cloud front will cache our web app into edge server. This may cause our web app not showing the lastest version but the older version.

To solve the issue, please follow the this
[ducument](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
