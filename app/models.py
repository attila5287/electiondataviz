from app import db


class Description(db.Model):
    pass
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(16), nullable=False, default='Ford')
    Notes = db.Column(db.String(16), nullable=False, default='Mustang')
    PublicTable = db.Column(
        db.String(16), nullable=False, default='table name')
    Statistic = db.Column(db.String(16), nullable=False, default='3')
    UnitOfMeasure = db.Column(db.String(16), nullable=False, default='0')

    def __repr__(self):
      return f"('\n...{self.PublicTable}'\n\t '{self.Statistic}' \n\t '{self.year}')"
