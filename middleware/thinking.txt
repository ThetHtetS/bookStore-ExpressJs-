login
    - let user = await userService.login(userName,password);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);

register
   -let user = await userService.register(userName,password);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });

auth
   let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);ok? userId

/////////////////////////////////////////////////////////////


login
    - let user = await userService.login(userName,password);
        let payload = { id: user._id,role: admin };
        const token = jwt.sign(payload, config.TOKEN_SECRET);

register
   -let user = await userService.register(userName,password);
        let payload = { id: user._id, role: user.roleisAdmin };
        const Admintoken = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });\

        let payload = { id: user._id, role: user.roleisuser };
        const userTokentoken = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });

auth
   let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);ok? userId