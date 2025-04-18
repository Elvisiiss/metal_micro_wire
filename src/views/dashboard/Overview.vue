<template>
  <div class="dashboard-overview">
    <div class="header">
      <h1 class="title">金属微细线材检测平台</h1>
      <p class="subtitle">高性能材料分析与质量管理系统</p>
    </div>

    <div class="stats-grid">
      <!-- 今日检测统计 -->
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><Calendar /></el-icon>
        </div>
        <div class="stat-content">
          <h3>今日检测</h3>
          <p class="stat-value">128 <span class="unit">批次</span></p>
          <p class="stat-change">↑ 12% 较昨日</p>
        </div>
      </div>

      <!-- 合格率统计 -->
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><Checked /></el-icon>
        </div>
        <div class="stat-content">
          <h3>合格率</h3>
          <p class="stat-value">98.7 <span class="unit">%</span></p>
          <p class="stat-change">↑ 0.5% 较上周</p>
        </div>
      </div>

      <!-- 线径平均值 -->
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><DataLine /></el-icon>
        </div>
        <div class="stat-content">
          <h3>平均线径</h3>
          <p class="stat-value">0.25 <span class="unit">mm</span></p>
          <p class="stat-change">标准差 ±0.02mm</p>
        </div>
      </div>

      <!-- 电导率 -->
      <div class="stat-card">
        <div class="stat-icon">
          <el-icon><Lightning /></el-icon>
        </div>
        <div class="stat-content">
          <h3>平均电导率</h3>
          <p class="stat-value">58.6 <span class="unit">MS/m</span></p>
          <p class="stat-change">符合GB/T 5231标准</p>
        </div>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart-card">
        <h3>线径分布直方图</h3>
        <div class="chart-placeholder"></div>
      </div>
      <div class="chart-card">
        <h3>拉伸强度趋势</h3>
        <div class="chart-placeholder"></div>
      </div>
    </div>

    <div class="recent-tests">
      <h3>最近检测记录</h3>
      <el-table :data="recentTests" style="width: 100%">
        <el-table-column prop="batchNo" label="批次号" width="120" />
        <el-table-column prop="diameter" label="线径(mm)" width="120" />
        <el-table-column prop="strength" label="拉伸强度(MPa)" width="150" />
        <el-table-column prop="conductivity" label="电导率(MS/m)" width="150" />
        <el-table-column prop="result" label="结果" width="100">
          <template #default="{ row }">
            <el-tag :type="row.result === '合格' ? 'success' : 'danger'">
              {{ row.result }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="testTime" label="检测时间" width="180" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {
  Calendar,
  Checked,
  DataLine,
  Lightning
} from '@element-plus/icons-vue'

// 模拟数据
const recentTests = [
  {
    batchNo: 'MW20230401',
    diameter: '0.25',
    strength: '215',
    conductivity: '58.7',
    result: '合格',
    testTime: '2023-04-01 14:30:22'
  },
  {
    batchNo: 'MW20230402',
    diameter: '0.24',
    strength: '208',
    conductivity: '57.9',
    result: '合格',
    testTime: '2023-04-01 15:12:45'
  },
  {
    batchNo: 'MW20230403',
    diameter: '0.26',
    strength: '198',
    conductivity: '56.3',
    result: '不合格',
    testTime: '2023-04-01 16:05:33'
  },
  {
    batchNo: 'MW20230404',
    diameter: '0.25',
    strength: '222',
    conductivity: '59.1',
    result: '合格',
    testTime: '2023-04-01 17:22:18'
  },
  {
    batchNo: 'MW20230405',
    diameter: '0.23',
    strength: '201',
    conductivity: '57.5',
    result: '合格',
    testTime: '2023-04-01 18:15:07'
  }
]
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
.dashboard-overview {
  padding: 20px;
  color: var(--el-text-color-primary);

  .header {
    margin-bottom: 30px;
    text-align: center;

    .title {
      font-size: 24px;
      margin-bottom: 8px;
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      padding: 20px;
      display: flex;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-icon {
        margin-right: 15px;
        font-size: 28px;
        color: #4facfe;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(79, 172, 254, 0.1);
        border-radius: 50%;
      }

      .stat-content {
        h3 {
          font-size: 14px;
          margin: 0 0 5px;
          font-weight: normal;
          color: var(--el-text-color-secondary);
        }

        .stat-value {
          font-size: 24px;
          margin: 0;
          font-weight: bold;

          .unit {
            font-size: 14px;
            color: var(--el-text-color-secondary);
          }
        }

        .stat-change {
          font-size: 12px;
          margin: 5px 0 0;
          color: #67c23a;
        }
      }
    }
  }

  .charts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;

    .chart-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      h3 {
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 16px;
      }

      .chart-placeholder {
        height: 250px;
        background: rgba(79, 172, 254, 0.05);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--el-text-color-secondary);
      }
    }
  }

  .recent-tests {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 16px;
    }
  }
}
</style>