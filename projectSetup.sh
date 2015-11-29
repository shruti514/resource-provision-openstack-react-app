
echo "Setting env varialble"

source /root/keystonerc_admin


echo "************** Setup Project for Development team **************"

echo "Creating a project"
keystone tenant-create --name='Development Team'

export tenant_id=$(keystone tenant-list| grep 'Development Team' | awk ' {print $2} ')

echo "Updating quota"
nova quota-update --instances 2 $tenant_id

echo "Creating a User"
keystone user-create --name=DeveloperAccount --pass=test --tenant_id=$tenant_id --email=DeveloperAccount@example.com


echo "************** Setup Project for Testing team **************"

echo "Creating a tenant for Testing Team"
keystone tenant-create --name='Testing Team'

export tenant_id=$(keystone tenant-list| grep 'Testing Team' | awk ' {print $2} ')

echo "Updating quota"
nova quota-update --instances 2 $tenant_id

echo "Creating a User"
keystone user-create --name=TestingAccount --pass=test --tenant_id=$tenant_id --email=TesterAccount@example.com



