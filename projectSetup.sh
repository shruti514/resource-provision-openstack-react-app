#!/usr/bin/env bash

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

echo "Creating network"
neutron net-create --tenant-id $tenant_id development

echo "Creating subnet"
neutron subnet-create --tenant-id $tenant_id  development 10.0.0.0/29

echo "Creating Ubuntu Image"
glance image-create --name Cirros-with-Hadoop --disk-format=vdi --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img

echo "Creating Fedora Image "
glance image-create --name Cirros-with-Java-7 --disk-format=vdi --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img


echo "************** Setup Project for Testing team **************"

echo "Creating a tenant for Testing Team"
keystone tenant-create --name='Testing Team'

export tenant_id=$(keystone tenant-list| grep 'Testing Team' | awk ' {print $2} ')

echo "Updating quota"
nova quota-update --instances 2 $tenant_id

echo "Creating a User"
keystone user-create --name=TestingAccount --pass=test --tenant_id=$tenant_id --email=TesterAccount@example.com

echo "Creating network"
neutron net-create --tenant-id $tenant_id testing

echo "Creating subnet"
neutron subnet-create --tenant-id $tenant_id  development 20.0.0.0/29

echo "Creating Cirros"
glance image-create --name Cirros-with-Hadoop --disk-format=vhd --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img

echo "Creating SOLARIS"
glance image-create --name Cirros-with-Java-7 --disk-format=vdi --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img





