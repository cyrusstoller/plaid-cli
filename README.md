# Plaid-cli

This is a CLI for the Plaid API. To install it, run the following:

```bash
$> npm install -g plaid-cli
```

Or, if you're running this locally:

```bash
$> npm install
$> npm link
```

There are two ways to use this tool.

1. Using a `.plaidrc` file
2. Providing credentials manually

## Using a `.plaidrc` file

This is the preferred method of interacting with this interface so that your
credentials are not stored in your command line history.

To use this method, create a `~/.plaidrc` and add the following content:

```bash
CLIENT_ID=**PLAID CLIENT ID**
SECRET=**PLAID SECRET**
PUBLIC_KEY=**PLAID PUBLIC KEY**
PLAID_ENV=**PLAID ENV (e.g. sandbox)**
```

Once this file is in place then you can start the CLI with:

```bash
$> plaid-cli
```

## Providing credentials manually

```bash
$> plaid-cli --client_id=CLIENT_ID --secret=SECRET \
  --public_key=PUBLIC_KEY --plaid_env=PLAID_ENV 
```

This will temporarily override any credentials provided in the `.plaidrc`.
