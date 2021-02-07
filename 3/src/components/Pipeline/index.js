import './index.css'
import rightSvg from '../../assets/right.svg'
import waitSvg from '../../assets/wait.svg'

export default {
  name: 'PipeLine',
  data() {
    return {
      stages: [{
          title: '编译',
          jobs: [{
            name: '编译',
            status: 'success',
            time: '00:01:01'
          }]
        },
        {
          title: '部署',
          jobs: [{
            name: '部署',
            status: 'success',
            time: '00:02:09'
          }]
        },
        {
          title: '代码扫码和检查',
          jobs: [{
              name: 'STC',
              status: 'success',
              time: '00:01:01'
            },
            {
              name: 'PWD',
              status: 'success',
              time: '00:01:01'
            },
            {
              name: 'AST',
              status: 'success',
              time: '00:01:01'
            }
          ]
        },
        {
          title: '集成测试',
          jobs: [{
              name: '集成测试',
              status: 'wait',
              time: '00:01:01'
            },
            {
              name: '单元测试',
              status: 'wait',
              time: '00:01:01'
            }
          ]
        }
      ]
    }
  },
  render(h) {
    const jobHeight = 36
    const jobMargin = 10
    const stages = this.stages.map((stage, stageIndex) => {
      const jobs = stage.jobs.map((job, jobIndex) => {
        const icon = h('div', {
          class: 'icon'
        }, [h('img', {
            attrs: {
              src: job.status==='success' ? rightSvg : waitSvg
            }
          })])
        const text = h('div', {
          class: 'text',
        }, job.name)

        const time = h('div', {
          class: 'time',
        }, job.time)

        const children = [icon, text, time]
        //直线情况
        if (stageIndex !== this.stages.length - 1 && jobIndex === 0) {
          const path = h('path', {
            attrs: {
              d: 'M 0, 1 L 100, 1',
              stroke: '#ccc',
              strokeWidth: '3px',
              fill: 'none'
            }
          })
          children.push(h('svg', { class: 'line' }, [ path ]))
        }
        const svgHeight = jobIndex * jobHeight + jobMargin * jobIndex
        //有jobs左边曲线
        if (stageIndex !== 0 && jobIndex !== 0) {
          const path = h('path', {
            attrs: {
              d: `M 0, 0 C 15,0 15,15 15,15 L 15,30 C 15,${svgHeight} 30,${svgHeight} 30,${svgHeight}`,
              stroke: '#ccc',
              strokeWidth: '3px',
              fill: 'none'
            }
          })
          children.push(h('svg', {
            class: 'before',
            style: {
              height: svgHeight,
              top: - (svgHeight - jobHeight/2)
            }
          }, [ path ]))
        }
        //有jobs右边曲线
        if (jobIndex !== 0 && stageIndex !== this.stages.length - 1) {
          const path = h('path', {
            attrs: {
              d: `M 30, 0 C 15,0 15,15 15,15 L 15,30 C 15,${svgHeight} 0,${svgHeight} 0,${svgHeight}`,
              stroke: '#ccc',
              strokeWidth: '3px',
              fill: 'none'
            }
          })
          children.push(h('svg', {
            class: 'after',
            style: {
              height: svgHeight,
              top: - (svgHeight - jobHeight/2)
            }
          }, [ path ]))
        }
        return h('div', {
          class: 'wrap-content'
        }, [h('div', {
          class: 'content',
        }, children)])
      })
      return h(
        'div', 
        {
          class: 'stage'
        },
        [ 
          h(
            'div',
            {
              class: 'title'
            }, 
            stage.title
          ),
          jobs
      ])
    })

    return h('div', {
      class: 'pipeline-component',
    }, [stages])
  }
}