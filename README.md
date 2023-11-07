# Needham Swim & Dive

## Local Development

To get the site up and running, you'll need Ruby.

Note: if you are using macOS with the M1 chip, you might want to read through [these instructions](https://www.shouvikbasak.net/website/jekyll-on-macos-apple-m1-solved/).

From the command line
```
# Install gems
$ bundle config set --local path vendor/bundle
$ bundle install

# Build with hot reloading
$ bundle exec jekyll serve --port 4000 --force_polling --incremental

# Build into directory
$ bundle exec jekyll build --verbose
```

### Kill Process Using Port 4000

```
$ lsof -i tcp:4000
$ kill -9 <PID>
```

## TODO

- [ ] Add grades for middle school athletes for results already recorded
