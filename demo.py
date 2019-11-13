#-*- coding:utf-8 -*-

from flask import Flask,render_template,request,redirect,escape,Markup
from datetime import datetime
#引入Mysql
import MySQLdb
import sys

reload(sys)
sys.setdefaultencoding('utf8')`

#申请空间
app=Flask(__name__)

#127.0.0.1:8000
@app.route('/')
def hello_world():
    list=load_data()
    return render_template('index.html',list=list)

@app.route('/post',methods=['POST'])
def post():
    name=request.form.get('name',u'匿名').encode('utf-8')
    comment=request.form.get('comment',u'暂无留言').encode('utf-8')
    create_time=datetime.now()
    save_data(name,comment,create_time)
    return redirect('/')

def save_data(name,comment,create_time):
    #连接数据库
    conn=MySQLdb.connect(host='127.0.0.1',port=3306,user='root',passwd='root',db='block',charset='utf8')
    cur=conn.cursor()
    cur.execute('set names utf8')
    #插入的sql语句
    sql=u"insert into word (`name`,comment,create_time) values ('{0}','{1}','{2}')".format(name.encode('utf-8'),comment.encode('utf-8'),create_time)
    #执行插入方法
    cur.execute(sql)
    cur.close()
    conn.commit()
    conn.close()

#加载列表
def load_data():
    # 连接数据库
    conn = MySQLdb.connect(host='127.0.0.1', port=3306, user='root', passwd='root', db='block',charset='utf8')
    cur = conn.cursor()
    cur.execute('set names utf8')
    sql='select * from word'
    cur.execute(sql)
    list=cur.fetchall()
    cur.close()
    conn.commit()
    conn.close()
    return list

#使datetime对象更容易分辨的模板的过滤器
@app.template_filter('datetime_fmt')
def datetime_fmt_filter(dt):
    return dt.strftime('%Y年%m月%d日 %H:%M:%S')
#将换行符置换为br标签的模板过滤器
@app.template_filter('nl2br')
def nl2br_filter(s):
    return escape(unicode(s)).replace('\\n',Markup('<br>'))

#执行flask项目
if __name__ == '__main__':
    app.run()