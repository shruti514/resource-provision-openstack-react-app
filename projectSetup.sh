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


echo "************** Setup Project for Testing team **************"

echo "Creating a tenant for Testing Team"
keystone tenant-create --name='Testing Team'

export tenant_id=$(keystone tenant-list| grep 'Testing Team' | awk ' {print $2} ')

echo "Updating quota"
nova quota-update --instances 2 $tenant_id

echo "Creating a User"
keystone user-create --name=TestingAccount --pass=test --tenant_id=$tenant_id --email=TesterAccount@example.com

echo "************** Uploading Images to Development Department **************"

echo "Creating Ubuntu Image for Development department"
source keystonerc_admin
glance image-create --name UBUNTU --disk-format=vdi --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img

echo "Creating Fedora Image for Development department"
source keystonerc_admin
glance image-create --name FEDORA --disk-format=vdi --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img

echo "************** Uploading Images to Testing Department **************"

echo "Creating Cirros Image for Testing department"
source keystonerc_admin
glance image-create --name CIRROS --disk-format=vhd --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img

echo "Creating SOLARIS Image for Testing department"
source keystonerc_admin
glance image-create --name SOLARIS --disk-format=vdi --owner $tenant_id --container-format=bare --is-public false --file ~/cirros-0.3.4-x86_64-disk.img



