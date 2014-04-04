from math import *
'''
def LatLongToTileXY(lat_deg, lon_deg, zoom):
	lat_rad = math.radians(lat_deg)
	n = 2.0 ** zoom
	xtile = int((lon_deg + 180.0) / 360.0 * n)
	ytile = int((1.0 - math.log(math.tan(lat_rad) + (1 / math.cos(lat_rad))) / math.pi) / 2.0 * n)
	return (xtile, ytile)
	

def TileXYToLatLong(xtile, ytile, zoom):
	n = 2.0 ** zoom
	lon_deg = xtile / n * 360.0 - 180.0
	lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
	lat_deg = math.degrees(lat_rad)
	return (lat_deg, lon_deg)
'''

EarthRadius = 6378137.0;
MinLatitude = -85.05112878;
MaxLatitude = 85.05112878;
MinLongitude = -180;
MaxLongitude = 180;

def Clip( n, minValue, maxValue ):
	return min(max(n, minValue), maxValue)

def MapSize( levelOfDetail ):
	return 256* (1 << levelOfDetail)

def GroundResolution( latitude, levelOfDetail ):
	global EarthRadius
	global MinLatitude
	global MaxLatitude
	global MinLongitude
	global MaxLongitude
	latitude = Clip(latitude, MinLatitude, MaxLatitude)
	return cos(latitude * pi / 180) * 2 * pi * EarthRadius / MapSize(levelOfDetail)

def MapScale( latitude, levelOfDetail, screenDpi ):
	return GroundResolution(latitude, levelOfDetail) * screenDpi / 0.0254

def LatLongToPixelXY( latitude, longitude, levelOfDetail ):
	global EarthRadius
	global MinLatitude
	global MaxLatitude
	global MinLongitude
	global MaxLongitude
	latitude = Clip(latitude, MinLatitude, MaxLatitude)
	longitude = Clip(longitude, MinLongitude, MaxLongitude)

	x = (longitude + 180) / 360
	sinLatitude = sin(latitude * pi / 180)
	y = 0.5 - log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * pi)

	mapSize = MapSize(levelOfDetail)
	pixelX = Clip(x * mapSize + 0.5, 0, mapSize - 1)
	pixelY = Clip(y * mapSize + 0.5, 0, mapSize - 1)
	return (int(pixelX), int(pixelY))

def PixelXYToLatLong( pixelX, pixelY, levelOfDetail):
	mapSize = MapSize(levelOfDetail)
	x = (Clip(pixelX, 0, mapSize - 1) / float(mapSize)) - 0.5
	y = 0.5 - (Clip(pixelY, 0, mapSize - 1) / float(mapSize))

	latitude = 90 - 360 * atan(exp(-y * 2 * pi)) / pi
	longitude = 360 * x
	return (latitude, longitude)

def TileXYToPixelXY( tileX, tileY):
	pixelX = tileX * 256
	pixelY = tileY * 256
	return (pixelX, pixelY)

def PixelXYToTileXY( pixelX, pixelY):
	tileX = pixelX / 256
	tileY = pixelY / 256
	return (tileX, tileY)

def LatLongToTileXY(latitude, longitude, levelOfDetail):
	PixelXY = LatLongToPixelXY( latitude, longitude, levelOfDetail )
	return PixelXYToTileXY(PixelXY[0], PixelXY[1])

def TileXYToLatLong(tileX, tileY, levelOfDetail):
	pixelXY = TileXYToPixelXY(tileX, tileY)
	return PixelXYToLatLong(pixelXY[0], pixelXY[1], levelOfDetail)

def TileXYToQuadKey( tileX, tileY, levelOfDetail):
	quadKey = ''
	#for (int i = levelOfDetail; i > 0; i--)
	i = levelOfDetail
	while i > 0:
		digit = 0
		mask = 1 << (i - 1)
		if (tileX & mask) != 0:
			digit = digit + 1
		if (tileY & mask) != 0:
			digit = digit + 1
			digit = digit + 1
		quadKey = quadKey + str(digit)
		i = i - 1
	return quadKey

def QuadKeyToTileXY(quadKey):
	tileX = 0
	tileY = 0
	levelOfDetail = len(quadKey)
	#for (int i = levelOfDetail; i > 0; i--)
	i = levelOfDetail
	while i > 0:
		mask = 1 << (i - 1)
		num = quadKey[levelOfDetail - i]
		if '0' == num:
			pass
		elif '1' == num:
			tileX = tileX | mask
		elif '2' == num:
			tileY = tileY | mask
		elif '3' == num:
			tileX = tileX | mask
			tileY = tileY | mask
		i = i - 1

	return (tileX, tileY, levelOfDetail)

import subprocess

def get_space_by_path(path):
	df = subprocess.Popen(["df", path], stdout=subprocess.PIPE)
	output = df.communicate()[0]
	device, size, used, available, percent, mountpoint = \
    	output.split("\n")[1].split()
	return int(available)

quadkey_compressed_length = 8
quadkey_directory_length = 5

def get_rel_quadkey_path(x, y, z):
	quadkey = TileXYToQuadKey(x, y, z)
	quadkey_for_file = quadkey[0:-8];
	quadkey_for_path = quadkey_for_file
	quadkey_path  = str(z) + "/"
	for i in range(0, (len(quadkey_for_path)/quadkey_directory_length)+1):
		quadkey_path = quadkey_path + quadkey_for_path[i*quadkey_directory_length:(i+1)*quadkey_directory_length]
		quadkey_path = quadkey_path + "/"
	if quadkey_path[-1] == '/' and quadkey_path[-2] == '/':
		quadkey_path = quadkey_path[0:-1]
	quadkey_path = quadkey_path[0:-1]
	#quadkey_path = raw_download_task['base_save_path'] + quadkey_path + '.hrv'
	quadkey_path = quadkey_path + '.hrv'
	return quadkey_path