#import makedatabase
import config
import os
import sys

# if not os.path.isfile(config.hrv_database_path):
#     makedatabase.makedatabase(config.hrv_database_path, config.base_path_list)


import web
import utility
import sqlite3
        
urls = (
    '/map/(.*)', 'handleRequest',
    '/terrain/(.*)', 'handleTerrain',
    '/upload', 'Upload'
)
app = web.application(urls, globals())

# hrv_db_cursor = None
# hrv_db_cursor = None
hrv_conn_cache = {}

class handleTerrain:
    def GET(self, qurey_string):
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        web.header('Content-Encoding',      'gzip')
        with open(config.terrain_path+qurey_string, 'rb') as fout:
            data = fout.read()
        return data
    
class Upload:
   

     def POST(self):
        x = web.input(myfile={})
        print 'path:',sys.path[0]
        filedir = sys.path[0]+'\static\picture' # change this to the directory you want to store the file in.
        
        if 'myfile' in x: # to check if the file-object is created
            filepath=x.myfile.filename.replace('\\','/') # replaces the windows-style slashes with linux ones.
            filename=filepath.split('/')[-1] # splits the and chooses the last part (the filename with extension)
            print 'filename'+filename
            fout = open(filedir +'/'+ filename,'wb') # creates the file where the uploaded file should be stored
            print 'file:'+filedir +'/'+ filename
            fout.write(x.myfile.file.read()) # writes the uploaded file to the newly created file.
            fout.close() # closes the file, upload complete.
            
        return filename
    
class handleRequest:        
    def GET(self, qurey_string):
        map_name, z, x, y = qurey_string.split("/")
        z, x = int(z), int(x)
        y = int(y.split(".")[0])
        quadkey = utility.TileXYToQuadKey(x, y, z)
        quadkey_for_path = quadkey[0:-8]
        cache_key = map_name+str(z)+quadkey_for_path

        hrv_path = None
        if hrv_conn_cache.has_key(cache_key):
            hrv_path = hrv_conn_cache[cache_key]
        
        if None == hrv_path and len(config.base_path_list)>0:
            for file_path in config.base_path_list:
                try_path = file_path+"/"+map_name+"/"+utility.get_rel_quadkey_path(x, y, z)
                if os.path.isfile(try_path):
                    hrv_path = try_path

        if None == hrv_path:
            id = -100
            if z<=8:
                id = -100 - z
            else:
                id = int(quadkey_for_path, 4)
            hrv_db_connect = sqlite3.connect(config.hrv_database_path, isolation_level="DEFERRED", check_same_thread = False)
            hrv_db_cursor = hrv_db_connect.cursor()
            hrv_db_cursor.execute("select path from hrvs where id=? and map_name=?", (id, map_name))
            try:
                hrv_path = hrv_db_cursor.fetchall()[0][0]
            except Exception, e:
                print "no quadkey_for_path:", quadkey_for_path, "map_name:", map_name
            finally:
                hrv_db_cursor.close()
                hrv_db_connect.close()

            if None == hrv_path:
                web.ctx.status = '404 Not Found'
                web.header('Content-Type', 'text/plain')
                return None

        if None != hrv_path:
            hrv_conn_cache[cache_key] = hrv_path

        hrv_conn = sqlite3.connect(hrv_path, isolation_level="DEFERRED", check_same_thread = False)

        hrv_cursor = hrv_conn.cursor()
        hrv_cursor.execute("select image from tiles where level=? and x=? and y=?", (z, x, y))
        raw_data = hrv_cursor.fetchall()
        image_data = None
        try:
            image_data = raw_data[0][0]
        except Exception, e:
            print "no quadkey_for_path:", quadkey_for_path, "map_name:", map_name, "z:", z, "x:",x, "y:",y
        finally:
            hrv_cursor.close()
            hrv_conn.close()

        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        if None == image_data:
            web.ctx.status = '404 Not Found'
            web.header('Content-Type', 'text/plain')
        return image_data
        #return "Hello"



if __name__ == "__main__":
    app.run()
