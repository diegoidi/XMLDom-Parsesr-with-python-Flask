from flask import Flask, render_template, request
from werkzeug import secure_filename
from subprocess import call
import re,os.path,xmltodict,json,argparse,xml.etree.ElementTree as ET,sys,lxml,subprocess,os
from os import path

app = Flask(__name__)
UPLOAD_FOLDER = './Uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def homepage():
    return(render_template("index.html"))

@app.route("/cloudsftp/")
def cloudsftp():
    return(render_template("cloudsftp.html"))

@app.route("/dashboard/")
def dashboard():
    return(render_template("mainform.html"))

@app.route("/about/")
def about():
    return(render_template("about.html"))

@app.route("/uploader/", methods = ['GET','POST'])
def upload_file():
    print(request.form)
    if request.method == 'POST':

        file = request.files["file"]
        pat = request.form['element']
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        else:
            flash("File not selected by user")

        if pat:
            jsondata = getelemval(filename,pat)
            print(jsondata)
            return(jsondata)
        else:
            jsondata = xmltojson(filename)
            return(jsondata)

def xmltojson(file):

    text = open(file,'r')
    filetext = text.read()
    text.close()

    d1 = re.search(r"^\S+xml version=",filetext,flags=re.MULTILINE)

    if d1:
        with open(file,'r') as rfile:
            rdata = rfile.read().splitlines(True)
        with open('updated.xml','w') as wfile:
            wfile.writelines(rdata[1:])

        if path.isfile('updated.xml'):

            with open('updated.xml','r') as ufile:
                udata = ufile.read().replace("\n","").replace("\t","")

            udict = xmltodict.parse(udata)
            jsondata = json.dumps(udict)
            return(jsondata)
    else:
        print("Pattern not found")

def iterparent(val,cnt):

    finaldict = {}
    finaldict[val.tag] = {}
    mainkey = val.tag
    if len(val.attrib):
        for k,v in val.attrib.items():
            k = '@' + k
            finaldict[mainkey][k] = v
    childlist = []
    for child in val:
        childlist.append(child.tag)
    if len(childlist) > 1 and len(set(childlist)) == 1:
        print("The childlist values are identicle")
    for child in val:
        childdict = {}
        if len(child):
            cnt = cnt + 1
            iterparent(child,cnt)
        else:
            finaldict[mainkey][child.tag] = child.text
    jsondata = json.dumps(finaldict)
    print(jsondata)
    return(jsondata)


def getelemval(file,elem):

    parser = ET.XMLParser(encoding="utf-8")
    tree = ET.parse(file,parser=parser)
    root = tree.getroot()
    elmlist = []
    dictdata = {}
    cnt = 0
    for val in root.iter():
        elmlist.append(val.tag)
        if val.attrib:
            dict = val.attrib
            for k in dict.keys():
                if dict[k].upper() == elem.upper():
                    if len(val):
                        cnt = 1
                        data = iterparent(val,cnt)
                        return(data)
                    else:
                        print("not a parent")

        if val.text.upper() == elem.upper():
            cnt = cnt + 1
            print("not a parent")
            elemdict = {}
            keyt = "#text"
            parntag = val.tag
            prt = root.findall('.//{value}/..'.format(value=parntag))
            for i in prt:
                elm = i.find('./{value}'.format(value=val.tag))
                if elm.text.upper() == elem.upper():
                    parnattrib = i.attrib
                    parntag = i.tag
            elemdict[parntag] = {}
            if parnattrib:
                for k,v in parnattrib.items():
                    k = '@' + k
                    elemdict[parntag][k] = v
            elemdict[parntag][val.tag] = {}

            if len(val.attrib):
                dict = val.attrib
                for k,v in dict.items():
                    k = '@' + k
                    elemdict[parntag][val.tag][k] = v

            elemdict[parntag][val.tag][keyt] = val.text
            jsondata = json.dumps(elemdict)
            return(jsondata)

    if cnt == 0:
        print("The requested value not available in xml file")

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
