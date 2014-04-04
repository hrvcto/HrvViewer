import os
import xml.dom.minidom

current_path = os.path.split(os.path.realpath(__file__))[0]
base_path_list = None
#hrv_database_path = current_path + "/hrv_database"
terrain_path = ""

if not os.path.isfile(current_path+"/config.xml"):
    base_path_list = ["/home/test/GIS/test-data/", "/home/test/GIS/test-data1/"]  
    terrain_path = current_path + "/../data/terrain/"
else:
    dom = xml.dom.minidom.parse(current_path+"/config.xml")
    dom_config = dom.getElementsByTagName("config")[0]
    dom_base_path_list = dom_config.getElementsByTagName("base_path_list")[0]
    base_path_list = []
    for dom_path in dom_base_path_list.getElementsByTagName("path"):
        base_path_list.append(dom_path.childNodes[0].data)
    dom_terrain_path = dom_config.getElementsByTagName("terrain_path")[0]
    terrain_path = dom_terrain_path.childNodes[0].data

#print base_path_list, hrv_database_path, terrain_path
print base_path_list, terrain_path
