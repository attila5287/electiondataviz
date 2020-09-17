from datetime import datetime
from squares import db, login_manager
from flask_login import UserMixin
from flask import url_for


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False,
                           default='default.png')
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False,
                            default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"


class Item(db.Model):
    pass
    id = db.Column(db.Integer, primary_key=True)
    manufacturer = db.Column(db.String(32))
    catalog_no = db.Column(db.String(32))
    catalog_fullname = db.Column(db.String(256))
    color_primary = db.Column(db.String(32))
    color_secondary = db.Column(db.String(32))
    inv_lowinstock = db.Column(db.String(32))
    inv_outofstock = db.Column(db.String(32))
    is_adjustable = db.Column(db.String(32))
    is_snapback = db.Column(db.String(32))
    is_flexfit = db.Column(db.String(32))
    is_fitted = db.Column(db.String(32))
    is_youth = db.Column(db.String(32))
    is_unstructured = db.Column(db.String(32))
    has_meshback = db.Column(db.String(32))
    has_curvedbill = db.Column(db.String(32))
    has_flatbill = db.Column(db.String(32))
    imagegrid_url = db.Column(db.String(256))
    imagelist_url = db.Column(db.String(256))
    product_url = db.Column(db.String(256))


    def display_properties(self):
        '''GENERATES A DICT OF ITEM PHYSICAL PROPERTIES FOR EASE OF FRONT END DESIGN FOR INV-HOME'''
        pass
        labels = [
            'is_snapback',
            'has_flatbill',
            'has_meshback',
            'is_flexfit',
            'is_adjustable',
            'is_youth',
            'is_fitted',
            'has_curvedbill',
            'is_unstructured',
        ]
        properties = [
            self.is_snapback,
            self.has_flatbill,
            self.has_meshback,
            self.is_flexfit, 
            self.is_adjustable,
            self.is_youth, 
            self.is_fitted, 
            self.has_curvedbill, 
            self.is_unstructured, 
        ]
        return dict(zip(labels, properties))

    def display_tablerow(self):
        '''GENERATES A LIST OF ITEM YES-NO ATTRIBUTES FOR EASE OF FRONT-END DESIGN INV-LISTER'''
        pass
        _tablerow_data = [
            self.is_snapback,
            self.is_adjustable,
            self.is_flexfit,
            self.is_youth,
            self.is_fitted,
            self.is_unstructured,
            self.has_curvedbill,
            self.has_flatbill,
        ]
        return [td for td in _tablerow_data]
        
    def running_low(self):
        pass
        self.inv_lowinstock = 'yes'
        self.inv_outofstock = 'no'

    def now_restocked(self):
        pass
        self.inv_lowinstock = 'no'

    def just_ran_out(self):
        pass
        self.inv_lowinstock = 'no'
        self.inv_outofstock = 'yes'

    def now_restock3d(self):
        pass
        self.inv_outofstock = 'no'

    def gen_attr_dict(self):
        ''' GENERATE A DICT WITH ALL CLASS ATTR AND INSTNCE AS KEY-VALUE PAIRS '''
        pass
        _attrs = [
            'id',
            'manufacturer',
            'catalog_fullname',
            'color_primary',
            'color_secondary',
            'inv_lowinstock',
            'inv_outofstock',
            'is_snapback',
            'is_adjustable',
            'is_flexfit',
            'is_youth',
            'is_fitted',
            'is_unstructured',
            'has_curvedbill',
            'has_flatbill',
            'imagelist_url',
            'imagegrid_url',
            'product_url',

        ]
        _values = [
            str(self.id),
            self.manufacturer,
            self.catalog_fullname,
            self.color_primary,
            self.color_secondary,
            self.inv_lowinstock,
            self.inv_outofstock,
            self.is_snapback,
            self.is_adjustable,
            self.is_flexfit,
            self.is_youth,
            self.is_fitted,
            self.is_unstructured,
            self.has_curvedbill,
            self.has_flatbill,
            self.imagelist_url,
            self.imagegrid_url,
            self.product_url,
        ]
        return dict(zip(_attrs, _values))

    def update_via_wtforms(self, form):
        pass
        self.manufacturer = form.manufacturer.data
        self.catalog_fullname = form.catalog_fullname.data
        self.color_primary = form.color_primary.data
        self.color_secondary = form.color_secondary.data
        self.imagelist_url = form.imagelist_url.data
        self.imagegrid_url = form.imagegrid_url.data
        self.product_url = form.product_url.data
        self.inv_lowinstock = form.inv_lowinstock.data
        self.inv_outofstock = form.inv_outofstock.data
        self.is_snapback = form.is_snapback.data
        self.is_adjustable = form.is_adjustable.data
        self.is_flexfit = form.is_flexfit.data
        self.is_youth = form.is_youth.data
        self.is_fitted = form.is_fitted.data
        self.is_unstructured = form.is_unstructured.data
        self.has_curvedbill = form.has_curvedbill.data
        self.has_flatbill = form.has_flatbill.data
        print('\n\t... models.item no {}  u p d a t e d ...\n'.format(self.id))

    def similar_attrs(self):
        '''COLLECTS ALL YES ATTRS AND RETURNS A DICT FOR FUTURE QUERY'''
        pass
        _class_attr = [
            'color_primary', 
            'color_secondary', 
            'inv_outofstock', 
            'is_snapback', 
            'is_adjustable', 
            'is_flexfit', 
            'is_youth', 
            'is_fitted', 
            'is_unstructured', 
            'has_curvedbill', 
            'has_flatbill',
        ]
        _inst_values = [
            self.color_primary,
            self.color_secondary,
            self.inv_outofstock,
            self.is_snapback,
            self.is_adjustable,
            self.is_flexfit,
            self.is_youth,
            self.is_fitted,
            self.is_unstructured,
            self.has_curvedbill,
            self.has_flatbill,
        ]
        return {value: key for key, value in zip(_class_attr,_inst_values) if value is 'yes'}

    def describe_attrs(self):
        '''GENERATES A DICT OF ITEM PHYSICAL PROPERTIES FOR EASE OF FRONT END DESIGN FOR INV-HOME'''
        pass
        labels = [
            'Is Snap Back',
            'Has Flat Bill',
            'Has Mesh Back',
            'Is Flex Fit',
            'Is Adjustable',
            'Is Youth Size',
            'Is Fitted',
            'Has Curved Bill',
            'Is Unstructured',
        ]
        properties = [
            self.is_snapback,
            self.has_flatbill,
            self.has_meshback,
            self.is_flexfit,
            self.is_adjustable,
            self.is_youth,
            self.is_fitted,
            self.has_curvedbill,
            self.is_unstructured,
        ]
        return dict(zip(labels, properties))




    def __repr__(self):
        pass
        str_list = [
            '',
            '\t││ ║║║║║║║ │\titem id: '+str(self.id),
            '\t││ ║║║║║║║ │\tmanfctr: '+str(self.manufacturer),
            '    '+str(self.catalog_fullname).upper()+'\n',
        ]
        return '\n'.join(str_list)


class Square(db.Model):
    '''A SQUARE CONTAINS 6 ITEMS IN EA. ROW and 9 IN COL '''
    pass
    __tablename__ = 'square'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    row_count = db.Column(db.Integer)
    col_count = db.Column(db.Integer)

    def __repr__(self):

        return '\n\t Square ID: {} \n\t Sqr Name: {}\n\t Row Count: {}\n\t Column Ct: {}\n\t'


class Unit(db.Model):
    '''EA. UNIT WILL SUGGEST MAIN-ALTERNATIVE-ITEMS OR 
    SET MANUALLY EA.SQUARE WILL HAVE 54 UNITS'''
    pass
    __tablename__ = 'unit'

    id = db.Column(db.Integer, unique=True, primary_key=True)
    square_id = db.Column(db.Integer)
    pstn_rowcol = db.Column(db.String(32))
    unique_tag = db.Column(db.String(32),unique=True)
    mainitem_id = db.Column(db.Integer)
    maininv_out = db.Column(db.String(32))
    dispitem_id = db.Column(db.Integer, db.ForeignKey('item.id'))


    def mainitem_out(self):
        pass
        self.maininv_out == 'yes'
    
    def mainitem_restck(self):
        pass

        self.maininv_out = 'no'


    def __repr__(self):
        pass
            
        str_list = [
            '',
            '\t unique tag: {}'.format(self.unique_tag), 
            '╔═════════╗\t square id: {}'.format(self.square_id),
            '║ ││║║║ │ ║\t pstn rowcol: {}'.format(self.pstn_rowcol), 
            '║ ││║║║ │ ║\t main_item id: {}'.format(self.mainitem_id),
            '╚═════════╝\t main_item inv out: {}'.format(self.maininv_out),
            '     └─ disp_item id: {}'.format(self.dispitem_id),
            '',
        ]

        return '\n'.join(str_list)




