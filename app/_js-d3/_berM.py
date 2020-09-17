from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from berenice import db, login_manager
from flask_login import UserMixin

class Item(db.Model):
    pass
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(16), nullable=False, default='Ford')
    model = db.Column(db.String(16), nullable=False, default='Mustang')
    year = db.Column(db.String(16), nullable=False,default='2007')
    body_type = db.Column(db.String(16), nullable=False, default='3')
    dest_id = db.Column(db.String(16), nullable=False, default='0')
    ship_status = db.Column(db.String(16), nullable=False,default='0')
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    

    def __repr__(self):
        return f"Item('\n...{self.make}'\n\t '{self.model}' \n\t '{self.year}')"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
# user object
class User(db.Model, UserMixin):
    pass
    id = db.Column(db.Integer, primary_key=True)
    is_shipper = db.Column(db.Text)
    location_id = db.Column(db.String(1), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.png')
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

class Post(db.Model):
    pass
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"
