import 'antd/dist/reset.css';
import './styles.css';
import React from 'react';
import { Divider, Typography, Tabs, Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';

import { Wallet } from '@ethersproject/wallet';
import { ethToAstra } from '@astradefi/address-converter';
import { generateMnemonic } from 'bip39';

const generateKey = async (mnemonic) => {};

const { Title, Paragraph, Text, Link } = Typography;

export default function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [eth, setEth] = useState('');
  const [astra, setAstra] = useState('');
  useEffect(() => {
    if (mnemonic.length < 1) {
      return;
    }
    const load = async () => {
      const wallet = Wallet.fromMnemonic(mnemonic);
      const getAddress = await wallet.getAddress();
      setEth(getAddress);
      setAstra(ethToAstra(getAddress));
    };
    load();
    return;
  }, [mnemonic]);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(
        {
          mnemonic,
          eth,
          astra,
        },
        null,
        4
      )
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'secret.json';
    link.click();
  };

  return (
    <div className="App">
      <Typography>
        <Title>Astra Key Generator</Title>
        <Tabs defaultActiveKey="item-1">
          <Tabs.TabPane tab="Generate key" key="item-1">
            <Button
              type="primary"
              onClick={() => {
                const privateMnemonic = generateMnemonic(256);
                setMnemonic(privateMnemonic);
              }}
            >
              Generate
            </Button>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Get key from Mnemonic" key="item-2">
            <Input
              allowClear
              placeholder="Enter Mnemonic"
              onPressEnter={(e) => {
                // console.log(e.target.value);
                try {
                  const wallet = Wallet.fromMnemonic(mnemonic);
                  setMnemonic(e.target.value);
                } catch (e) {
                  message.error(e.message);
                }
              }}
            />
          </Tabs.TabPane>
        </Tabs>
        <Divider />
        <Typography.Title level={5} style={{ margin: 0 }}>
          Mnemonic
        </Typography.Title>
        {mnemonic.length > 0 && <Paragraph copyable>{mnemonic}</Paragraph>}
        <Typography.Title level={5} style={{ margin: 0 }}>
          ETH Address
        </Typography.Title>
        {eth.length > 0 && <Paragraph copyable>{eth}</Paragraph>}
        <Typography.Title level={5} style={{ margin: 0 }}>
          Astra Address
        </Typography.Title>
        {astra.length > 0 && <Paragraph copyable>{astra}</Paragraph>}
      </Typography>
      <Button type="primary" onClick={exportData}>
        Save backup
      </Button>
    </div>
  );
}
