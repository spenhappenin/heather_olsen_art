##########################
#####     ORDERS     #####
##########################

# Set the ids to start at 1000
ActiveRecord::Base.connection.execute("ALTER SEQUENCE orders_id_seq RESTART 1000;")
