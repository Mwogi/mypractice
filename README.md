MyPractice Angular:

# Changes needed to successfully npm install:
1. npm install angular-user-idle --save
2. npm install jsonwebtoken --save
3. npm install ngx-permissions --save
4. replace the line 'node: false,' in `node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js' to 'node: { crypto: true, stream: true },' .