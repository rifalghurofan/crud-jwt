const config = require("../config/auth");
const User = require("../models/user");
const Role = require("../models/role");
const passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

passport.use('isSuper',
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id },
            function (err, user) {
                console.log()
                if (err) {
                    return done(err, false);
                }
                if (jwt_payload.role[0].name == 'super') {
                    return done(err, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
    }));

passport.use('isAdmin',
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id },
            function (err, user) {
                console.log()
                if (err) {
                    return done(err, false);
                }
                if (jwt_payload.role[0].name == 'admin') {
                    return done(err, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
    }));

passport.use('isMember',
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id },
            function (err, user) {
                console.log()
                if (err) {
                    return done(err, false);
                }
                if (jwt_payload.role[0].name == 'member') {
                    return done(err, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
    }));