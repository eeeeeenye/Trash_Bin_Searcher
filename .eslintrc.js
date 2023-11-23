module.exports = {
    root: true,
    extends: ['airbnb', 'prettier' , "standard-with-typescript",
    "plugin:react/recommended"],
    rules: {
        'import/prefer-default-export': 'off',
        'import/extensions': ['off'],
     },
    "env": {
        "browser": true,
        "es2021": true
    },
   
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    
}
