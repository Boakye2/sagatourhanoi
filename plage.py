#!/usr/bin/python
'''find an ip adress plage'''

# @Contributor : Freeman Lovelace
# @Contributor :
# @COntributor :

'''this script use only mask witch are in CIDR format
for example : mask like 255.255.255.224 are allowed but those like 0.0.0.255 are not allowed'''


significantOctet = 0
_index_ = 0
n = 10
firstAddr = 0
lastAddr = 0
firstNetworkIP = []
lastNetworkIP = []


def plage(ip,mask) :   # call this fucntion with right parameters to
                         # calculate an ip adress plage
    global significantOctet, _index_, n, firstAddr, lastAddr

    firstNetworkIP, lastNetworkIP = ip.split('.'), ip.split('.')

    maskToTable = mask.split('.')
    ipToTable = ip.split('.')

    for octet in maskToTable :
        if int(octet, 10) != 0 :
            significantOctet = int(octet, 10)
        else :
            _index_ = maskToTable.index(str(significantOctet));
            break
    
    magicNumber = 256 - significantOctet

    for i in range(0, n) :
        if magicNumber * i <= int(ipToTable[_index_], 10) :
            firstAddr = magicNumber * i
            n += 1 # we want a growing n value 
        else :
            break
    
    lastAddr = (firstAddr + magicNumber) - 1

    firstNetworkIP[_index_] = str(firstAddr)
    lastNetworkIP[_index_] = str(lastAddr)

    if len(ipToTable) - 1 != _index_ :
        for i in range (_index_ + 1, len(ipToTable)) :
            firstNetworkIP[i] = '0'
            lastNetworkIP[i] = '255'

    return 'Votre sous-reseau s\'etend de ' + ".".join(firstNetworkIP) + ' à ' + ".".join(lastNetworkIP)




while True :
    param = str(input('Entrer une IP et son masque => : '))
    print()
    print(plage(param.split(' ~> ')[0], param.split(' ~> ')[1]))
    print()
