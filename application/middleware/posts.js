var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var db = require("../conf/database")

module.exports = {
    makeThumbnail: function (req, res, next) {

        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {

                var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                    req.file.filename.split(".")[0]
                }.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },

    getPostsForUserBy: async function (req, res, next) {
        var {id} = req.params;
        try {
            let [rows, _] = await db.execute(
                `SELECT p.thumbnail, p.title, p.id
                from posts p
                JOIN users u
                ON p.fk_userId=u.id
                WHERE u.id=?;`, [id]
            );
            res.locals.posts = rows;
            next();

        } catch (error) {
            next(error);
        }

    },
    getPostById: async function (req, res, next) {
        var {id} = req.params;
        try {
            let [rows, _] = await db.execute(
                `select u.username,p.video,p.title,p.description,p.id ,p.createdAt
                from posts p
                JOIN users u
                ON p.fk_userId=u.id
                WHERE p.id=?;`, [id]
            );

            const post = rows[0];
            if (!post) {

            } else {
                res.locals.currentPost = post;
                next();
            }
        } catch (error) {
            next(error);
        }


    },
    getCommentsForPostById: async function (req, res, next) {
        var {id} = req.params;
        try {
            let [rows, _] = await db.execute(
                `select u.username,c.text,c.createdAt,u.profileImg
                from comments c
                JOIN users u
                ON c.fk_authorId=u.id
                WHERE c.fk_postId=?;`, [id]
            );
            res.locals.currentPost.comments = rows;
            next();

        } catch (error) {
            next(error);
        }

    },
    //recent 9 posts
    getRecentPosts: async function (req, res, next) {
        var {id} = req.params;
        try {
            let [rows, _] = await db.execute(
                `SELECT u.username, p.thumbnail, p.title, p.description, p.id
            FROM posts p
            JOIN users u 
            ON p.fk_userId = u.id
            ORDER BY p.createdAt DESC
            LIMIT 9`
            );
            res.locals.posts = rows;
            next();
        } catch (error) {
            next(error);
        }
    },
    isMyPost:async function(req,res,next){
        var {id}=req.params; //post id
        try {
            let [rows, _] = await db.execute(`SELECT fk_userId FROM posts WHERE id = ?;`, [id]);

            const post = rows[0];
            res.locals.post = post;

            if (post &&post.fk_userId == req.session.user.userId) {
               next();
            }else{
                req.flash("error",`This is not your post.`);
                req.session.save(function(err){
                    if(err)next(err);
                    res.redirect(`/users/profile/${req.session.user.userId}`);
                })
            }

        } catch (error) {
            next(error);
        }
    },
}