$ heroku pg:credentials:url
The system cannot find the path specified.
Connection information for default credential.
Connection info string:

   "
    dbname=dcrjqdnonkc3m0
    host=ec2-174-129-33-132.compute-1.amazonaws.com 
    port=5432
    user=itdjzuakoxytrq 
    password=275c4c2ca25166001e5e886980afc7be1e866f07a5db9fd55a7889b6e6ab1276 
    sslmode=require
    "
Connection URL:
   postgres://itdjzuakoxytrq:275c4c2ca25166001e5e886980afc7be1e866f07a5db9fd55a7889b6e6ab1276@ec2-174-129-33-132.compute-1.amazonaws.com:5432/dcrjqdnonkc3m0


Host
    ec2-174-129-33-132.compute-1.amazonaws.com
Database
    dcrjqdnonkc3m0
User
    itdjzuakoxytrq
Port
    5432
Password
    275c4c2ca25166001e5e886980afc7be1e866f07a5db9fd55a7889b6e6ab1276
URI
    postgres://itdjzuakoxytrq:275c4c2ca25166001e5e886980afc7be1e866f07a5db9fd55a7889b6e6ab1276@ec2-174-129-33-132.compute-1.amazonaws.com:5432/dcrjqdnonkc3m0
Heroku CLI
    heroku pg:psql postgresql-flat-26247 --app nodaysoff

$ heroku help pg
The system cannot find the path specified.
show database information

USAGE
  $ heroku pg [DATABASE]

OPTIONS
  -a, --app=app        (required) app to run command    
                       against

  -r, --remote=remote  git remote of app to use

COMMANDS
  pg:backups             list database backups
  pg:bloat               show table and index bloat in  
                         your database ordered by most  
                         wasteful
  pg:blocking            display queries holding locks  
                         other queries are waiting to be                         released
  pg:connection-pooling  add an attachment to a database                         using connection pooling       
  pg:copy                copy all data from source db to                         target
  pg:credentials         show information on credentials                         in the database
  pg:diagnose            run or view diagnostics report 
  pg:info                show database information      
  pg:kill                kill a query
  pg:killall             terminates all connections for 
                         all credentials
  pg:links               lists all databases and        
                         information on link
  pg:locks               display queries with active    
                         locks
  pg:maintenance         show current maintenance       
                         information
  pg:outliers            show 10 queries that have      
                         longest execution time in      
                         aggregate
  pg:promote             sets DATABASE as your
                         DATABASE_URL
  pg:ps                  view active queries with       
                         execution time
  pg:psql                open a psql shell to the       
                         database
  pg:pull                pull Heroku database into local                         or remote database
  pg:push                push local or remote into      
                         Heroku database
  pg:reset               delete all data in DATABASE    
  pg:settings            show your current database     
                         settings
  pg:unfollow            stop a replica from following  
                         and make it a writeable        
                         database
  pg:upgrade             unfollow a database and upgrade                         it to the latest stable        
                         PostgreSQL version
  pg:vacuum-stats        show dead rows and whether an  
                         automatic vacuum is expected to                         be triggered
  pg:wait                blocks until database is       
                         available


DATABASE_URL=`heroku config:get DATABASE_URL` 

Host
    ec2-174-129-33-132.compute-1.amazonaws.com
Database
    dcrjqdnonkc3m0
User
    itdjzuakoxytrq
Port
    5432
Password
    275c4c2ca25166001e5e886980afc7be1e866f07a5db9fd55a7889b6e6ab1276
URI
    postgres://itdjzuakoxytrq:275c4c2ca25166001e5e886980afc7be1e866f07a5db9fd55a7889b6e6ab1276@ec2-174-129-33-132.compute-1.amazonaws.com:5432/dcrjqdnonkc3m0
Heroku CLI
    heroku pg:psql postgresql-flat-26247 --app nodaysoff


pg
pg:backups
pg:backups:cancel
pg:backups:capture
pg:backups:delete
pg:backups:download
pg:backups:info
pg:backups:restore
pg:backups:schedule
pg:backups:schedules
pg:backups:unschedule
pg:backups:url
pg:bloat
pg:blocking
pg:connection-pooling:attach
pg:copy
pg:credentials
pg:credentials:create
pg:credentials:destroy
pg:credentials:repair-default
pg:credentials:rotate
pg:credentials:url
pg:diagnose
pg:info
pg:kill
pg:killall
pg:links
pg:links:create
pg:links:destroy
pg:locks
pg:maintenance
pg:maintenance:run
pg:maintenance:window
pg:outliers
pg:promote
pg:ps
pg:psql
pg:pull
pg:push
pg:reset
pg:settings
pg:settings:log-lock-waits
pg:settings:log-min-duration-statement
pg:settings:log-statement
pg:unfollow
pg:upgrade
pg:vacuum-stats
pg:wait    
